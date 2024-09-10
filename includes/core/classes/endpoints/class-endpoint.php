<?php
/**
 * Endpoint Class for Custom Rewrite Rules and Query Handling in GatherPress.
 *
 * This file defines the `Endpoint` class, which is responsible for managing
 * custom rewrite rules, query variables, and template redirects for endpoints
 * tied to specific post types or taxonomies in the GatherPress plugin.
 *
 * @package GatherPress\Core\Endpoints
 * @since 1.0.0
 */

namespace GatherPress\Core\Endpoints;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit; // @codeCoverageIgnore

/**
 * Manages Custom Endpoints for Post Types and Taxonomies in GatherPress.
 *
 * The `Endpoint` class provides functionality for registering custom endpoints
 * based on post types or taxonomies. It defines rewrite rules, adds custom query
 * variables, and handles both template redirects and custom templates. This class
 * is responsible for:
 *
 * The class supports registering endpoints for custom slugs, handling validation
 * callbacks, and dynamically redirecting or rendering templates based on the request.
 *
 * @since 1.0.0
 */
class Endpoint {

	/**
	 * Internal, non-public, name of the query variable used to identify the endpoint.
	 *
	 * This property holds the custom query variable name that will be appended to the
	 * endpoint's URL. It is used to differentiate the various types of endpoints.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	public $query_var;

	/**
	 * Holds the registered WP_Post_Type or WP_Taxonomy object.
	 *
	 * Depending on the `object_type` parameter, this property will either store
	 * a `WP_Post_Type` object for a post type or a `WP_Taxonomy` object for a taxonomy.
	 * This is used to generate the correct rewrite rules and handle URL matching.
	 *
	 * @since 1.0.0
	 *
	 * @var WP_Post_Type|WP_Taxonomy
	 */
	public $type_object;

	/**
	 * Callback function used to validate requests made to the endpoint.
	 *
	 * The validation callback is used during template redirects and query validation
	 * to ensure that the endpoint request meets certain conditions before proceeding.
	 *
	 * @since 1.0.0
	 *
	 * @var callable
	 */
	public $validation_callback;

	/**
	 * List of configured endpoint resolvers.
	 *
	 * This property holds an array of endpoint types such as `Endpoint_Redirect` and
	 * `Endpoint_Template`, which determine how the endpoint behaves (e.g., whether it
	 * redirects or serves a template).
	 *
	 * @since 1.0.0
	 *
	 * @var Endpoint_Type[]
	 */
	public $types;

	/**
	 * Regular expression used to match the endpoint URL structure.
	 *
	 * This property holds the regular expression pattern that will be used to define the
	 * endpoint URL structure. It is combined with the post type or taxonomy rewrite base
	 * and the slug of the endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	public $reg_ex;

	/**
	 * Class constructor.
	 *
	 * Initializes the endpoint by setting up necessary properties and ensuring
	 * that the provided object type is valid.
	 *
	 * @since 1.0.0
	 *
	 * @param string          $query_var           The query variable used in WP_Query to identify the endpoint.
	 * @param string          $type_name           The name of the post type or taxonomy this endpoint operates on.
	 * @param callable        $validation_callback Callback function used to validate requests made to the endpoint.
	 * @param Endpoint_Type[] $types               List of endpoint types (such as redirects or templates) supported.
	 * @param string          $reg_ex              Regular expression pattern for matching URLs handled by the endpoint.
	 * @param string          $object_type         Type of object, either 'post' (default) or 'taxonomy'.
	 */
	public function __construct(
		string $query_var,
		string $type_name,
		callable $validation_callback,
		array $types,
		string $reg_ex,
		string $object_type = 'post_type',
	) {
		// ...
		if ( $this->is_valid_registration( $type_name, $types, $object_type ) ) {
			$this->query_var           = $query_var;
			$this->validation_callback = $validation_callback;
			$this->types               = $types;
			$this->reg_ex              = $reg_ex;

			$this->hook_prio = 11; // @todo make dynamic: current-prio + 1

			$this->setup_hooks();
		}
	}

	/**
	 * Set up hooks for various purposes.
	 *
	 * This method adds hooks for different purposes as needed.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	protected function setup_hooks(): void {
		add_action( 'init', array( $this, 'init' ), $this->hook_prio );

		if ( false !== strpos( $this->reg_ex, '/feed/' ) ) {

			$feed_slug = $this->get_slugs( __NAMESPACE__ . '\Endpoint_Template' )[0];
			$action    = sprintf(
				'gatherpress_load_feed_template_for_%s',
				$feed_slug
			);

			// Do not hook this action multiple times.
			if ( 0 < did_action( $action ) ) {
				return;
			}
			// Hook into WordPress' feed handling to load the custom feed template.
			add_action(
				sprintf(
					'do_feed_%s',
					$feed_slug
				),
				array( $this, 'load_feed_template' )
			);
			do_action( $action );
		}
	}

	/**
	 * Initializes the endpoint by registering rewrite rules and handling query variables.
	 *
	 * The method generates rewrite rules for the endpoint based on the post type or taxonomy rewrite base
	 * and matches against the provided slugs. It also filters allowed query variables to include the custom query variable for the endpoint.
	 * The method hooks into the `template_redirect` action to handles template loading
	 * or redirecting based on the endpoint type.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function init(): void {

		// Retrieve the rewrite base (slug) for the post type or taxonomy.
		$rewrite_base = $this->type_object->rewrite['slug'];
		$slugs        = join( '|', $this->get_slugs() );
		// Build the regular expression pattern for matching the custom endpoint URL structure.
		$reg_ex = sprintf(
			$this->reg_ex,
			$rewrite_base,
			$slugs
		);
		// Define the URL structure for handling matched requests via query vars.
		// Example result: 'index.php?gatherpress_event=$matches[1]&gatherpress_ext_calendar=$matches[2]'.
		$rewrite_url = $this->get_rewrite_url();

		// Add the rewrite rule to WordPress.
		add_rewrite_rule( $reg_ex, $rewrite_url, 'top' );

		// Allow the custom query variable by filtering the public query vars.
		add_filter( 'query_vars', array( $this, 'allow_query_vars' ) );

		// Handle whether to include a template or redirect the request.
		add_action( 'template_redirect', array( $this, 'template_redirect' ) );
	}

	public function get_rewrite_url(): string {
		return add_query_arg(
			array(
				$this->type_object->name => '$matches[1]',
				$this->query_var         => '$matches[2]',
			),
			'index.php'
		);
	}

	/**
	 * Validates the registration of the endpoint based on timing, object type and given endpoint types.
	 *
	 * This method ensures that:
	 * - The action `init` has been fired, meaning the WordPress environment is fully set up.
	 * - The provided object type (post type or taxonomy) is registered.
	 * - Rewrites are enabled for the object type (e.g., post type or taxonomy) to support custom endpoints.
	 *
	 * If the validation fails, appropriate warnings are triggered using `wp_trigger_error()`.
	 *
	 * @since 1.0.0
	 *
	 * @param string $type_name   The name of the post type or taxonomy to validate.
	 * @param array  $types       Array of endpoint types to register (redirects/templates).
	 * @param string $object_type The type of object ('post' or 'taxonomy').
	 * @return bool               Returns true if registration is valid, false otherwise.
	 */
	private function is_valid_registration( string $type_name, array $types, string $object_type ): bool {

		if ( 0 === did_action( 'init' ) ) {
			wp_trigger_error(
				__CLASS__,
				'was called too early! Run on init:11 to make all the rewrite-vodoo work.',
				E_USER_WARNING
			);
			return false;
		}

		if ( empty( $types ) ) {
			wp_trigger_error(
				__CLASS__,
				'can not be called without endpoint types. Add at least one of either "Endpoint_Redirect" or "Endpoint_Template" to the list of types.',
				E_USER_WARNING
			);
			return false;
		}

		if ( ! in_array( $object_type, array('post_type', 'taxonomy'), true ) ) {
			wp_trigger_error(
				__CLASS__,
				"called on '$type_name' doesn't work, because '$object_type' is no supported object type. Use either 'post_type' or 'taxonomy'.",
				E_USER_WARNING
			);
			return false;
		}
/* 
		if ( 0 === did_action( sprintf( 'registered_%s_%s', $object_type, $type_name ) ) ) {
			wp_trigger_error(
				__CLASS__,
				"was called too early! Make sure the '$type_name' $object_type is already registered.",
				E_USER_WARNING
			);
			return false;
		} */

		// Store the validated post type or taxonomy object for later use.
		switch ( $object_type ) {
			case 'taxonomy':
				$this->type_object = get_taxonomy( $type_name );
				break;
				
			case 'post_type':
				$this->type_object = get_post_type_object( $type_name );
				break;
		}

		if ( false === $this->type_object->rewrite ) {
			wp_trigger_error(
				__CLASS__,
				"called on '$type_name' doesn't work, because this $object_type has rewrites disabled.",
				E_USER_WARNING
			);
			return false;
		}
		return true;
	}

	/**
	 * Filters the query variables allowed before processing.
	 *
	 * Adds the custom query variable used by the endpoint to the list of allowed
	 * public query variables so that it can be recognized and used by WordPress.
	 *
	 * @since 1.0.0
	 *
	 * @param string[] $public_query_vars The array of allowed query variable names.
	 * @return string[]                   The updated array of allowed query variable names.
	 */
	public function allow_query_vars( array $public_query_vars ): array {
		$public_query_vars[] = $this->query_var;
		return $public_query_vars;
	}

	/**
	 * Fires before determining which template to load or whether to redirect.
	 *
	 * This method is responsible for:
	 * - Validating the query to ensure the endpoint is correctly matched.
	 * - Performing redirects if the current endpoint has associated redirects.
	 * - Loading a custom template if the endpoint defines one.
	 *
	 * @since 1.0.0
	 *
	 * @see https://developer.wordpress.org/reference/hooks/template_redirect/
	 *
	 * @return void
	 */
	public function template_redirect(): void {

		if ( ! $this->is_valid_query() ) {
			return;
		}

		// Get the currently requested endpoint from the list of registered endpoint types.
		$endpoint_type = current(
			wp_list_filter(
				$this->types,
				array(
					'slug' => get_query_var( $this->query_var ),
				)
			)
		);
		// if ( $this->has_redirects() ) {
		// 	$endpoint_type->activate();
		// }

		// if ( $this->has_templates() ) {
		// 	$endpoint_type->activate();
		// }
		$endpoint_type->activate();
	}

	/**
	 * Load the theme-overridable feed template from the plugin.
	 *
	 * This method ensures that a feed template is loaded when a request is made to
	 * a custom feed endpoint. If the theme provides an override for the feed template,
	 * it will be used; otherwise, the default template from the plugin is loaded. The
	 * method ensures that WordPress does not return a 404 for custom feed URLs.
	 *
	 * A call to any post types /feed/anything endpoint is handled by WordPress
	 * prior 'Endpoint_Template's template_include hook would run.
	 * Therefore WordPress will throw an xml'ed 404 error,
	 * if nothing is hooked onto the 'do_feed_anything' action.
	 *
	 * That's the reason for this method, it delivers what WordPress wants
	 * and re-uses the parameters provided by the class.
	 *
	 * We expect that a endpoint, that contains the /feed/ string, only has one 'Redirect_Template' attached.
	 * This might be wrong or short sightened, please open an issue in that case: https://github.com/GatherPress/gatherpress/issues
	 *
	 * Until then, we *just* use the first of the provided endpoint-types,
	 * to hook into WordPress, which should be the valid template endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function load_feed_template() {
		load_template( $this->types[0]->template_include( false ) );
	}

	/**
	 * Checks if the current query is valid for this endpoint.
	 *
	 * This method uses the validation callback provided during construction
	 * to ensure that the query is valid. It also checks if the custom query
	 * variable is populated.
	 *
	 * @since 1.0.0
	 *
	 * @return bool True if the query is valid, false otherwise.
	 */
	public function is_valid_query(): bool {
		return call_user_func( $this->validation_callback ) && ! empty( get_query_var( $this->query_var ) );
	}

	/**
	 * Checks if the currently requested endpoint has redirects attached.
	 *
	 * This method determines if the endpoint has an associated redirect based on
	 * the custom query variable and the list of available redirect slugs.
	 *
	 * @since 1.0.0
	 *
	 * @return bool True if the endpoint has a redirect, false otherwise.

	public function has_redirects(): bool {
		return in_array(
			get_query_var( $this->query_var ),
			$this->get_slugs( __NAMESPACE__ . '\Endpoint_Redirect' ),
			true
		);
	}	 */

	/**
	 * Checks if the currently requested endpoint has templates to load.
	 *
	 * This method determines if the endpoint has an associated template based on
	 * the custom query variable and the list of available template slugs.
	 *
	 * @since 1.0.0
	 *
	 * @return bool True if the endpoint has a template, false otherwise.

	public function has_templates(): bool {
		return in_array(
			get_query_var( $this->query_var ),
			$this->get_slugs( __NAMESPACE__ . '\Endpoint_Template' ),
			true
		);
	}	 */

	/**
	 * Retrieves the slugs of the specified endpoint types.
	 *
	 * This method filters the `types` array to get the slugs for either a specific type of endpoint
	 * (e.g., `Endpoint_Redirect` or `Endpoint_Template`) or returns slugs for all types if no type
	 * is specified.
	 *
	 * @since 1.0.0
	 *
	 * @param string|null $entity Optional. The class name of the endpoint type to filter by (e.g., 'Endpoint_Redirect' or 'Endpoint_Template').
	 *                            If null, it retrieves slugs for all types.
	 * @return string[]           An array of slugs for the specified or all types.
	 */
	protected function get_slugs( string|null $entity = null ): array {
		// Determine Enpoint_Types to get slug names from.
		$types = ( null === $entity )
			// All?
			? $this->types
			// Or a specific type?
			: array_filter(
				$this->types,
				function ( $type ) use ( $entity ) {
					return $type instanceof $entity;
				}
			);
		return wp_list_pluck( $types, 'slug' );
	}
}
