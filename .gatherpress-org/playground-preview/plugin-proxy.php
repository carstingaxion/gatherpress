<?php
/**
 * https://gatherpress.org/some-random-chars/plugin-proxy.php?org=GatherPress&repo=gatherpress&workflow=Build%20GatherPress%20Plugin%20Zip&artifact=gatherpress-pr&pr=666
 * 
 * 
 * Based on: https://github.com/WordPress/wordpress-playground/blob/ca759ee3281837596bfdd9736bbea205104741b2/packages/playground/website/public/plugin-proxy.php
 */
ini_set( 'display_errors', 0 );

putenv( 'GITHUB_TOKEN=___REPLACE_WITH_REAL_GITHUB_TOKEN___' );

class ApiException extends Exception {

}
class PluginDownloader {


	private $githubToken;

	public function __construct( $githubToken ) {
		$this->githubToken = $githubToken;
	}

	public function streamFromGithubPR( $organization, $repo, $pr, $workflow_name, $artifact_name ) {
		$prDetails = $this->gitHubRequest( "https://api.github.com/repos/$organization/$repo/pulls/$pr" )['body'];
		if ( ! $prDetails ) {
			throw new ApiException( 'invalid_pr_number' );
		}
		$branchName = urlencode( $prDetails->head->ref );
		$ciRuns     = $this->gitHubRequest( "https://api.github.com/repos/$organization/$repo/actions/runs?branch=$branchName" )['body'];
		if ( ! $ciRuns ) {
			throw new ApiException( 'no_ci_runs' );
		}

		$artifactsUrls = [];
		foreach ( $ciRuns->workflow_runs as $run ) {
			if ( $run->name === $workflow_name ) {
				$artifactsUrls[] = $run->artifacts_url;
			}
		}
		if ( ! $artifactsUrls ) {
			throw new ApiException( 'artifact_not_found' );
		}

		foreach ( $artifactsUrls as $artifactsUrl ) {
			$zip_download_api_endpoint = $zip_url = null;

			$artifacts = $this->gitHubRequest( $artifactsUrl )['body'];
			if ( ! $artifacts ) {
				continue;
			}

			foreach ( $artifacts->artifacts as $artifact ) {
				if ( $artifact_name === $artifact->name ) {
					if ( $artifact->size_in_bytes < 3000 ) {
						throw new ApiException( 'artifact_invalid' );
					}
					$zip_download_api_endpoint = $artifact->archive_download_url;
					break;
				}
			}
			if ( ! $zip_download_api_endpoint ) {
				continue;
			}

			/*
			 * Short-circuit with HTTP 200 OK when we only want to
			 * verify whether the CI artifact seems to exist but we
			 * don't want to download it yet.
			 */
			if ( array_key_exists( 'verify_only', $_GET ) ) {
				header( 'HTTP/1.1 200 OK' );
				return;
			}

			$allowed_headers = array(
				// 'accept-ranges',
				'content-disposition',
				'content-length',
				// 'content-type',
				'x-frame-options',
				'last-modified',
				'etag',
				'date',
				'age',
				'vary',
				'cache-Control',
			);
			$artifact_res    = $this->gitHubRequest( $zip_download_api_endpoint, false, false );

			// die(var_export($artifact_res['headers'],true));
			ob_end_flush();
			flush();

			// The API endpoint returns the actual artifact URL as a 302 Location header.
			foreach ( $artifact_res['headers'] as $header_line ) {
				$header_name  = strtolower( substr( $header_line, 0, strpos( $header_line, ':' ) ) );
				$header_value = trim( substr( $header_line, 1 + strpos( $header_line, ':' ) ) );
				if ( $header_name === 'location' ) {
					streamHttpResponse(
						$header_value,
						'GET',
						[],
						null,
						$allowed_headers,
						[
							'Content-Type: application/zip',
							// TODO // WEIRD
							// Having this here DOES NOT WORK,
							// the exact same line needs to be placed in .htaccess.
							// 'Content-Disposition: attachment; filename="gatherpress-pr.zip"',
						]
					);
					die();
				}
			}
			throw new ApiException( 'artifact_redirect_not_present' );
		}
		if ( ! $artifacts ) {
			throw new ApiException( 'artifact_not_available' );
		}
		if ( ! $zip_download_api_endpoint ) {
			throw new ApiException( 'artifact_not_available' );
		}
		if ( ! $zip_url ) {
			throw new ApiException( 'artifact_not_available' );
		}
	}

	protected function gitHubRequest( $url, $decode = true, $follow_location = true ) {
		$headers[] = 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36';
		$headers[] = 'Authorization: Bearer ' . $this->githubToken;
		$context   = stream_context_create(
			[
				'http' => [
					'method'          => 'GET',
					'header'          => implode( "\r\n", $headers ),
					'follow_location' => $follow_location,
				],
			]
		);
		$response  = file_get_contents( $url, false, $context );
		if ( $response === false ) {
			throw new ApiException( 'Request failed' );
		}
		// Find the last index of "HTTP/1.1 200 OK" in $http_response_header array
		for ( $i = count( $http_response_header ) - 1; $i >= 0; $i-- ) {
			if ( substr( $http_response_header[ $i ], 0, 12 ) === 'HTTP/1.1 200' ) {
				break;
			}
		}
		$headers = array_map( 'trim', array_slice( $http_response_header, $i + 1 ) );
		return [
			'body'    => $decode ? json_decode( $response ) : $response,
			'headers' => $headers,
		];
	}
}

function streamHttpResponse( $url, $request_method = 'GET', $request_headers = [], $request_body = null, $allowed_response_headers = [], $default_response_headers = [] ) {
	$ch = curl_init( $url );
	curl_setopt_array(
		$ch,
		[
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_CONNECTTIMEOUT => 30,
			CURLOPT_FAILONERROR    => true,
			CURLOPT_FOLLOWLOCATION => true,
		]
	);

	if ( $request_method === 'POST' ) {
		curl_setopt( $ch, CURLOPT_POST, true );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $request_body );
	} elseif ( $request_method === 'HEAD' ) {
		curl_setopt( $ch, CURLOPT_NOBODY, true );
	}

	if ( count( $request_headers ) ) {
		curl_setopt( $ch, CURLOPT_HTTPHEADER, $request_headers );
	}

	$seen_headers = [];
	curl_setopt(
		$ch,
		CURLOPT_HEADERFUNCTION,
		function ( $curl, $header_line ) use ( $seen_headers, $allowed_response_headers ) {
			if ( strpos( $header_line, ':' ) === false ) {
				return strlen( $header_line );
			}
			$header_name                  = strtolower( substr( $header_line, 0, strpos( $header_line, ':' ) ) );
			$seen_headers[ $header_name ] = true;
			$illegal_headers              = [ 'transfer-encoding' ];
			$header_allowed               = (
				null === $allowed_response_headers || in_array( $header_name, $allowed_response_headers )
			) && ! in_array( $header_name, $illegal_headers );
			if ( $header_allowed ) {
				header( $header_line );
			}
			return strlen( $header_line );
		}
	);
	$extra_headers_sent = false;
	curl_setopt(
		$ch,
		CURLOPT_WRITEFUNCTION,
		function ( $curl, $body ) use ( &$extra_headers_sent, $default_response_headers ) {
			if ( ! $extra_headers_sent ) {
				foreach ( $default_response_headers as $header_line ) {
					$header_name = strtolower( substr( $header_line, 0, strpos( $header_line, ':' ) ) );
					if ( ! isset( $seen_headers[ $header_name ] ) ) {
						header( $header_line );
					}
				}
				$extra_headers_sent = true;
			}
			echo $body;
			flush();
			return strlen( $body );
		}
	);
	curl_exec( $ch );
	$info = curl_getinfo( $ch );
	curl_close( $ch );
	return $info;
}

$downloader = new PluginDownloader(
	getenv( 'GITHUB_TOKEN' )
);

// Serve the request:
if ( ! array_key_exists( 'url', $_GET ) ) {
	header( 'Access-Control-Allow-Origin: *' );
}
$pluginResponse;
try {
	if ( isset( $_GET['org'] ) && isset( $_GET['repo'] ) && isset( $_GET['workflow'] ) && isset( $_GET['pr'] ) && isset( $_GET['artifact'] ) ) {
		$allowedInputs = [
			[
				'org'      => 'GatherPress',
				'repo'     => 'gatherpress',
				'workflow' => 'Playground Preview',
				'artifact' => '#gatherpress-pr#',
			],
		];
		$allowed       = false;
		foreach ( $allowedInputs as $allowedInput ) {
			if (
				$_GET['org'] === $allowedInput['org'] &&
				$_GET['repo'] === $allowedInput['repo'] &&
				$_GET['workflow'] === $allowedInput['workflow'] &&
				preg_match( $allowedInput['artifact'], $_GET['artifact'] )
			) {
				$allowed = true;
				break;
			}
		}
		if ( ! $allowed ) {
			header( 'HTTP/1.1 400 Invalid request' );
			die( 'Invalid request: The specified URL is not allowed.' );
		}
		$downloader->streamFromGithubPR(
			$_GET['org'],
			$_GET['repo'],
			$_GET['pr'],
			$_GET['workflow'],
			$_GET['artifact']
		);

		// **
		// * Pass through the request headers we got from WordPress via fetch(),
		// * then filter out:
		// *
		// * * The browser-specific headers
		// * * Headers related to security to avoid leaking any auth information
		// *
		// * ...and pass the rest to the proxied request.
		// *
		// * @return array
		// */
		// function get_request_headers()
		// {
		// $headers = [];
		// foreach ($_SERVER as $name => $value) {
		// if (substr($name, 0, 5) !== 'HTTP_') {
		// continue;
		// }
		// $name = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($name, 5)))));
		// $lcname = strtolower($name);
		// if (
		// $lcname === 'authorization'
		// || $lcname === 'cookie'
		// || $lcname === 'host'
		// || $lcname === 'origin'
		// || $lcname === 'referer'
		// || 0 === strpos($lcname, 'sec-')
		// ) {
		// continue;
		// }
		// $headers[$name] = $value;
		// }
		// return $headers;
		// }

		// streamHttpResponse(
		// $url,
		// $_SERVER['REQUEST_METHOD'],
		// get_request_headers(),
		// file_get_contents('php://input'),
		// null
		// );
	} else {
		throw new ApiException( 'Invalid query parameters' );
	}
} catch ( ApiException $e ) {
	header( 'HTTP/1.1 400 Invalid request' );
	if ( ! headers_sent() ) {
		header( 'Content-Type: application/json' );
	}
	die( json_encode( [ 'error' => $e->getMessage() ] ) );
}
