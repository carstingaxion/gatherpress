<?php
/**
 * File comment block for Rsvp_Setup class.
 *
 * This file contains the definition of the Rsvp_Setup class, which handles
 * setup tasks related to RSVP functionality within the GatherPress plugin.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit; // @codeCoverageIgnore

use GatherPress\Core\Endpoints\Endpoint_Template;
use GatherPress\Core\Endpoints\Posttype_Single_Endpoint;
use GatherPress\Core\Traits\Singleton;

/**
 * Handles setup tasks related to RSVP functionality.
 *
 * The Rsvp_Setup class initializes necessary hooks and configurations for managing RSVPs.
 * It registers a custom taxonomy for RSVPs and adjusts comment counts specifically for events.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */
class Rsvp_Setup {
	/**
	 * Enforces a single instance of this class.
	 */
	use Singleton;

	/**
	 * Class constructor.
	 *
	 * This method initializes the object and sets up necessary hooks.
	 *
	 * @since 1.0.0
	 */
	protected function __construct() {
		$this->setup_hooks();
	}

	/**
	 * Set up hooks for various purposes.
	 *
	 * This method adds hooks for different purposes as needed.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	protected function setup_hooks(): void {
		add_action( 'init', array( $this, 'register_taxonomy' ) );
		add_action( 'init', array( $this, 'register_block_template' ) );
		add_filter( 'get_comments_number', array( $this, 'adjust_comments_number' ), 10, 2 );
		add_action(
			sprintf(
				'registered_post_type_%s',
				'gatherpress_event'
			),
			array( $this, 'setup_endpoint' ),
		);
		add_filter( 'show_admin_bar', '__return_false' ); // @todo DEBUG DEMO ONLY !!!
	}

	/**
	 * Register custom comment taxonomy for RSVPs.
	 *
	 * Registers a custom taxonomy 'gatherpress_rsvp' for managing RSVP related functionalities specifically for comments.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_taxonomy(): void {
		register_taxonomy(
			Rsvp::TAXONOMY,
			'comment',
			array(
				'labels'             => array(),
				'hierarchical'       => false,
				'public'             => true,
				'show_ui'            => false,
				'show_admin_column'  => false,
				'query_var'          => true,
				'publicly_queryable' => false,
				'show_in_rest'       => true,
			)
		);
	}

	/**
	 * Adjusts the number of comments displayed for event posts.
	 *
	 * Retrieves and returns the count of approved RSVP comments for event posts.
	 *
	 * @since 1.0.0
	 *
	 * @param int $comments_number The original number of comments.
	 * @param int $post_id         The ID of the post.
	 * @return int Adjusted number of comments.
	 */
	public function adjust_comments_number( int $comments_number, int $post_id ): int {
		if ( Event::POST_TYPE !== get_post_type( $post_id ) ) {
			return $comments_number;
		}

		$comment_count = get_comment_count( $post_id );

		return $comment_count['approved'] ?? 0;
	}

	public function register_block_template(): void {
		// the namespace is not allowed to contain "_" as it is validated against: '/^[a-z0-9-]+\/\/[a-z0-9-]+$/'
		// @see /wp-content/plugins/gutenberg/lib/compat/wordpress-6.7/class-wp-block-templates-registry.php lines 53ff
		// maybe open an issue about that missmatching error message
		\wp_register_block_template( 'gatherpress//rsvp', [
			'title'       => __( 'RSVP', 'gatherpress' ),
			'description' => __( 'A RSVP block template .', 'gatherpress' ),
			'content'     => self::get_template_content( 'endpoints/rsvp.php' ),
		] );
	}

	public static function get_template_content( $template ) {
		ob_start();
		// include __DIR__ . "/templates/{$template}";
		include sprintf(
			'%s/includes/templates/%s',
			GATHERPRESS_CORE_PATH,
			$template
		);
		return ob_get_clean();
	}

	public function setup_endpoint(): void {

		new Posttype_Single_Endpoint(
			array(
				new Endpoint_Template( 'rsvp', array( $this, 'get_rsvp_template' ) ),
			),
			'rsvp'
		);
	}


	/**
	 * Returns the template for the RSVP.
	 *
	 * This method provides the template file to be used for ....
	 *
	 * By adding a file with the same name to your themes root folder
	 * or your themes `/templates` folder, this template will be used
	 * with priority over the default template provided by GatherPress.
	 *
	 * @since 1.0.0
	 *
	 * @return array An array containing:
	 *               - 'file_name': the file name of the template to be loaded from the theme. Will load defaults from the plugin if theme files do not exist.
	 *               - 'dir_path':  (Optional) Absolute path to some template directory outside of the theme folder.
	 */
	public function get_rsvp_template(): array {
		return array(
			// 'file_name' => Utility::prefix_key( 'rsvp.php' ),
			'file_name' => 'rsvp.php',
		);
	}
}
