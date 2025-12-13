<?php
/**
 * Handles the setup and management of events in GatherPress.
 *
 * This class is responsible for integrating events into the WordPress environment, including the creation
 * of the custom post type for events, managing event metadata, and enhancing the admin dashboard for event management.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

namespace GatherPress\Core;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit; // @codeCoverageIgnore

use Exception;
use GatherPress\Core\Traits\Singleton;
use WP;
use WP_Post;

/**
 * Class Event_Setup.
 *
 * Manages event-related functionalities, including registration of event post types and metadata.
 *
 * @since 1.0.0
 */
class Event_Setup {
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
	public function __construct() {
		$this->setup_hooks();
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
		add_action( 'init', array( $this, 'register_post_type' ) );
		add_action( 'init', array( $this, 'register_post_meta' ) );
		add_action( 'init', array( $this, 'register_calendar_rewrite_rule' ) );
		add_action( 'parse_request', array( $this, 'handle_calendar_ics_request' ) );
		add_action( 'delete_post', array( $this, 'delete_event' ) );
		add_action( 'wp_after_insert_post', array( $this, 'set_datetimes' ) );
		add_action( sprintf( 'save_post_%s', Event::POST_TYPE ), array( $this, 'check_waiting_list' ) );
		add_action(
			sprintf( 'manage_%s_posts_custom_column', Event::POST_TYPE ),
			array( $this, 'custom_columns' ),
			10,
			2
		);

		add_filter( 'redirect_canonical', array( $this, 'disable_ics_canonical_redirect' ), 10, 2 );
		add_filter(
			sprintf( 'manage_%s_posts_columns', Event::POST_TYPE ),
			array( $this, 'set_custom_columns' )
		);
		add_filter(
			sprintf( 'manage_edit-%s_sortable_columns', Event::POST_TYPE ),
			array( $this, 'sortable_columns' )
		);
		add_filter( 'get_the_date', array( $this, 'get_the_event_date' ) );
		add_filter( 'the_time', array( $this, 'get_the_event_date' ) );
		add_filter( 'display_post_states', array( $this, 'set_event_archive_labels' ), 10, 2 );
		
		if (is_admin()) {
			// https://snippets.webaware.com.au/snippets/custom-post-names-for-wordpress-custom-post-types/
			// NB: AJAX action priority < 1 so we can beat WordPress to it!
			// add_action('wp_ajax_sample-permalink', array( $this, 'cbstdsys_ajax_eo_change_post_slug' ), 0);
			// add_filter('name_save_pre', array( $this, 'cbstdsys_eo_change_post_slug' ));
		
		}
		// add_filter( 'wp_unique_post_slug', array( $this, 'cbstdsys_filter_eo_change_post_slug' ), 10, 4 );


		/**
		 * Filters the sample permalink.
		 *
		 * @param array    $permalink { Array containing the sample permalink with placeholder for the post name, and the post name. @type string $0 The permalink with placeholder for the post name. @type string $1 The post name.
}
		 * @param int      $post_id   Post ID.
		 * @param string   $title     Post title.
		 * @param string   $name      Post name (slug).
		 * @param \WP_Post $post      Post object.
		 * @return array { Array containing the sample permalink with placeholder for the post name, and the post name. @type string $0 The permalink with placeholder for the post name. @type string $1 The post name.
}
		 */
		add_filter('get_sample_permalink',function( array $permalink, int $post_id, string $title, string $name, \WP_Post $post ) : array {
			error_log(var_export($permalink,true));

			// return $permalink;
			return array( $permalink[0], 'my-custom-slug');
		}, 10, 5 );
	}
/*
 * Fires authenticated Ajax actions for logged-in users.
 *
add_action('wp_ajax_{$action}',function() : void {
	
} )
 */

/*
 * Filters the value of a specific field before saving.
 *
 * @param mixed $value Value of the post field.
 * @return mixed Value of the post field.

add_filter('{$field_no_prefix}_save_pre',function( $value ) {
	
	return $value;
} )
 */	




/**/
public function cbstdsys_filter_eo_change_post_slug( $slug, $post_ID, $post_status, $post_type ) {
	if ( Event::POST_TYPE == $post_type && $post_ID ) {
		$post = get_post($post_ID);
		remove_filter( 'wp_unique_post_slug', array( $this, 'cbstdsys_filter_eo_change_post_slug' ), 10 );
		// $slug = $this->cbstdsys_eo_generate_post_slug( $post, $post->post_title );
		$slug = $this->cbstdsys_eo_generate_post_slug( $post, $slug );
		add_filter( 'wp_unique_post_slug', array( $this, 'cbstdsys_filter_eo_change_post_slug' ), 10, 4 );
	}
	return $slug;
}



/**
* intercept AJAX call for regenerating sample permalink, and add some extra bits where required
*/
public function cbstdsys_ajax_eo_change_post_slug() {
	// check that we're dealing with a event, and editing the slug
	$post_id = isset($_POST['post_id']) ? intval($_POST['post_id']) : 0;
	$post_name = isset($_POST['new_slug'])? $_POST['new_slug'] : null;
	$new_title = isset($_POST['new_title'])? $_POST['new_title'] : null;

	if ($post_id && $post_name === '') {
		$post = get_post($post_id);

		if ($post->post_type == Event::POST_TYPE) {
			// generate new slug
#			$_new_slug = cbstdsys_eo_generate_post_slug($post, $new_title);
#			$_POST['new_slug'] = remove_accents( wp_unique_post_slug($_new_slug, $post->ID, $post->post_status, $post->post_type, $post->post_parent) );
			$_POST['new_slug'] = $this->cbstdsys_eo_generate_post_slug($post, $new_title);

		}
	}
}

/**
* intercept the post name and generate a new one if required
* @param string $post_name
* @return string
*/
public function cbstdsys_eo_change_post_slug($post_name) {
	// check that we're dealing with a event, and editing the slug
	$post_id = isset($_POST['post_ID']) ? intval($_POST['post_ID']) : 0;
	$new_title = isset($_POST['post_title']) ? $_POST['post_title'] : 0;

	if ($post_id && $post_name === '') {
		$post = get_post($post_id);
		if ($post->post_type == Event::POST_TYPE && $post->post_status != 'auto-draft') {
			// generate new slug
			$post_name = $this->cbstdsys_eo_generate_post_slug($post, $new_title);
			// make sure that it's unique
#			$post_name = remove_accents( wp_unique_post_slug($post_name, $post->ID, $post->post_status, $post->post_type, $post->post_parent) );

		}
	}

	return $post_name;
}

/**
* generate new post_name for event
* @param WP_Post $post
* @param string $new_title
* @return string
*/
public function cbstdsys_eo_generate_post_slug($post, $new_title) {

	$event_year = $venue_id = $event_venue_name = $event_venue_city = '';

	if ( 0 === $new_title || null === $new_title )
		$new_title = $post->post_title;

	if ( isset($_POST['eo_input']['StartDate']) && !empty( $_POST['eo_input']['StartDate'] ) ) {
		$event_year = new DateTime( $_POST['eo_input']['StartDate'] );
		$event_year = $event_year->format('Y');
	}
	if ( !$event_year && function_exists('eo_get_the_start') ) {
		$event_year = eo_get_the_start( 'Y', $post->ID, 0 );
	}

	if ( isset($_POST['eo_input']['event-venue']) && !empty( $_POST['eo_input']['event-venue'] ) ) {
		$venue_id = intval($_POST['eo_input']['event-venue']);
	}
	if ( !$venue_id && function_exists('eo_get_venue') ) {
		$venue_id = eo_get_venue( $post->ID );
	}

	if ( isset($_POST['eo_venue']['name']) && !empty( $_POST['eo_venue']['name'] ) ) {
		$event_venue_name = $_POST['eo_venue']['name'];
	}
	if ( !$event_venue_name && function_exists('eo_get_venue_name') && $venue_id ) {
		$event_venue_name = eo_get_venue_name( $venue_id );
	}

	if ( isset($_POST['eo_venue']['city']) && !empty( $_POST['eo_venue']['city'] ) ) {
		$event_venue_city = $_POST['eo_venue']['city'];
	}
	if ( !$event_venue_city && function_exists('eo_get_venue_address') && $venue_id ) {
		$event_venue_adress = eo_get_venue_address( $venue_id );
		$event_venue_city = $event_venue_adress['city'];
	}


	// MAYBE TODO // bit ugly
	// Remove "City" from "Venue Name", to prevent duplication in URL
	// e.g .../taschen--schaubude-berlin-berlin--2018
	// have to be REMOVED because off this like this, happened
	// https://juliaraab.test/termine/die-dicke-spielt-medea-junge-er-buehne-ulm-2/
/*	if ( '' !== $event_venue_city && '' !== $event_venue_name ) {
		$event_venue_name = str_replace($event_venue_city, '', $event_venue_name);
	}*/

	// collate into an array, and join the non-empty elements
	$parts = array(
		'gatherpest',
		$new_title, 
#		'--', 
		$event_venue_name, 
		$event_venue_city, 
#		'--', 
		$event_year
	);
	$post_name = implode('-', array_filter($parts, 'strlen'));
/*

# DEBUG Output
wp_die(var_export(array( 
	'$parts' 		=>	$parts,
	'$post_name' 	=>	$post_name,
	'sanitize $post_name' 	=>	strtolower(sanitize_title_with_dashes($post_name))
)));*/


	// make the post name "browser friendly"
#	$post_name = strtolower( sanitize_title_with_dashes( $post_name ) );
	$post_name = sanitize_title( $post_name );

	// make sure that it's unique
	$post_name = wp_unique_post_slug($post_name, $post->ID, $post->post_status, $post->post_type, $post->post_parent);

	return $post_name;
}
	/**
	 * Registers the custom post type for Events.
	 *
	 * This method sets up the custom post type 'Event' with all necessary labels and settings,
	 * enabling it to be used within the WordPress REST API, and configuring its appearance and capabilities
	 * within the WordPress admin area. It defines labels for various UI elements, enables Gutenberg support,
	 * sets the post type to be public, and configures other settings such as the menu position and icon.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_post_type(): void {
		$settings     = Settings::get_instance();
		$rewrite_slug = $settings->get_value( 'general', 'urls', 'events' );
		register_post_type(
			Event::POST_TYPE,
			array(
				'labels'        => array(
					'name'                     => _x( 'Events', 'Admin menu and post type general name', 'gatherpress' ),
					'singular_name'            => _x( 'Event', 'Admin menu and post type singular name', 'gatherpress' ),
					'add_new'                  => __( 'Add New', 'gatherpress' ),
					'add_new_item'             => __( 'Add New Event', 'gatherpress' ),
					'edit_item'                => __( 'Edit Event', 'gatherpress' ),
					'new_item'                 => __( 'New Event', 'gatherpress' ),
					'view_item'                => __( 'View Event', 'gatherpress' ),
					'view_items'               => __( 'View Events', 'gatherpress' ),
					'search_items'             => __( 'Search Events', 'gatherpress' ),
					'not_found'                => __( 'No Events found.', 'gatherpress' ),
					'not_found_in_trash'       => __( 'No Events found in Trash.', 'gatherpress' ),
					'parent_item_colon'        => __( 'Parent Events:', 'gatherpress' ),
					'all_items'                => __( 'All Events', 'gatherpress' ),
					'archives'                 => __( 'Event Archives', 'gatherpress' ),
					'attributes'               => __( 'Event Attributes', 'gatherpress' ),
					'insert_into_item'         => __( 'Insert into Event', 'gatherpress' ),
					'uploaded_to_this_item'    => __( 'Uploaded to this Event', 'gatherpress' ),
					'menu_name'                => _x( 'Events', 'Admin menu label', 'gatherpress' ),
					'filter_items_list'        => __( 'Filter Event list', 'gatherpress' ),
					'filter_by_date'           => __( 'Filter by date', 'gatherpress' ),
					'items_list_navigation'    => __( 'Events list navigation', 'gatherpress' ),
					'items_list'               => __( 'Events list', 'gatherpress' ),
					'item_published'           => __( 'Event published.', 'gatherpress' ),
					'item_published_privately' => __( 'Event published privately.', 'gatherpress' ),
					'item_reverted_to_draft'   => __( 'Event reverted to draft.', 'gatherpress' ),
					'item_trashed'             => __( 'Event trashed.', 'gatherpress' ),
					'item_scheduled'           => __( 'Event scheduled.', 'gatherpress' ),
					'item_updated'             => __( 'Event updated.', 'gatherpress' ),
					'item_link'                => _x( 'Event Link', 'Block editor link label', 'gatherpress' ),
					'item_link_description'    => _x( 'A link to an event.', 'Block editor link description', 'gatherpress' ),
				),
				'show_in_rest'  => true,
				'rest_base'     => 'gatherpress_events',
				'public'        => true,
				'hierarchical'  => false,
				'template'      => array(
					array( 'gatherpress/event-date' ),
					array( 'gatherpress/add-to-calendar' ),
					array( 'gatherpress/venue' ),
					array( 'gatherpress/rsvp' ),
					array(
						'core/paragraph',
						array(
							'placeholder' => __(
								'Add a description of the event and let people know what to expect, including the agenda, what they need to bring, and how to find the group.',
								'gatherpress'
							),
						),
					),
					array( 'gatherpress/rsvp-response' ),
				),
				// @todo continue to work on the event-template.
				// 'template'      => array(
				// array( 'core/pattern', array( 'slug' => 'gatherpress/event-template' ) ),
				// ),
				'menu_position' => 4,
				'supports'      => array(
					'title',
					'author',
					'editor',
					'excerpt',
					'thumbnail',
					'comments',
					'revisions',
					'custom-fields',
				),
				'menu_icon'     => 'dashicons-nametag',
				'has_archive'   => true,
				'rewrite'       => array(
					'slug'       => $rewrite_slug,
					'with_front' => false,
				),
			)
		);
	}

	/**
	 * Returns the post type slug localized for the site language and sanitized as URL part.
	 *
	 * Do not use this directly, use get_value( 'general', 'urls', 'events' ) instead.
	 *
	 * This method switches to the sites default language and gets the translation of 'events' for the loaded locale.
	 * After that, the method sanitizes the string to be safely used within an URL,
	 * by removing accents, replacing special characters and replacing whitespace with dashes.
	 *
	 * @since 1.0.0
	 *
	 * @return string
	 */
	public static function get_localized_post_type_slug(): string {
		$switched_locale = switch_to_locale( get_locale() );
		$slug            = _x( 'Event', 'Post Type Singular Name', 'gatherpress' );
		$slug            = sanitize_title( $slug );
		if ( $switched_locale ) {
			restore_previous_locale();
		}
		return $slug;
	}

	/**
	 * Registers post meta for the Event custom post type.
	 *
	 * This method sets up custom metadata fields associated with Event posts, including
	 * an online event link and an option to enable anonymous RSVPs. Each meta field is configured
	 * with authorization, sanitization callbacks, visibility in the REST API, and data type specifications.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_post_meta(): void {
		$post_meta = array(
			'gatherpress_datetime'              => array(
				'auth_callback'     => static function () {
					return current_user_can( 'edit_posts' ); // @codeCoverageIgnore
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_datetime_start'        => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
			),
			'gatherpress_datetime_start_gmt'    => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_datetime_end'          => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_datetime_end_gmt'      => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_timezone'              => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_text_field',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_max_guest_limit'       => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'absint',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'integer',
			),
			'gatherpress_enable_anonymous_rsvp' => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'rest_sanitize_boolean',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'boolean',
				'default'           => false,
			),
			'gatherpress_online_event_link'     => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'sanitize_url',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'string',
			),
			'gatherpress_max_attendance_limit'  => array(
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
				'sanitize_callback' => 'absint',
				'show_in_rest'      => true,
				'single'            => true,
				'type'              => 'integer',
			),
		);

		foreach ( $post_meta as $meta_key => $args ) {
			register_post_meta(
				Event::POST_TYPE,
				$meta_key,
				$args
			);
		}
	}

	/**
	 * Register a rewrite rule and query var for serving .ics calendar downloads.
	 *
	 * This adds support for URLs like /event/my-event/my-event.ics that serve
	 * dynamically generated ICS files for individual events.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_calendar_rewrite_rule(): void {
		add_rewrite_rule(
			'^event/([^/]+)\.ics$',
			sprintf( 'index.php?post_type=%s&name=$matches[1]&gatherpress_ics=1', Event::POST_TYPE ),
			'top'
		);

		add_rewrite_tag( '%gatherpress_ics%', '1' );
	}

	/**
	 * Prevent WordPress from redirecting .ics URLs with a trailing slash.
	 *
	 * This ensures calendar download URLs like /event/my-event.ics are treated
	 * as file downloads and not rewritten with a trailing slash.
	 *
	 * @since 1.0.0
	 *
	 * @param string|false $redirect_url  The URL WordPress wants to redirect to.
	 * @param string       $requested_url The original requested URL.
	 * @return string|false The filtered redirect URL or false to cancel redirect.
	 */
	public function disable_ics_canonical_redirect( $redirect_url, string $requested_url ) {
		if ( false !== strpos( $requested_url, '.ics' ) ) {
			return false; // prevent canonical redirect.
		}

		return $redirect_url;
	}

	/**
	 * Handle calendar .ics file requests for single event pages.
	 *
	 * This method intercepts requests for .ics files based on a custom query var
	 * and serves dynamically generated ICS content for the specified event. It is
	 * intended to be hooked into the `parse_request` action.
	 *
	 * @since 1.0.0
	 *
	 * @param \WP $wp The current WP object containing query variables and request context.
	 * @return void
	 */
	public function handle_calendar_ics_request( WP $wp ): void {
		if ( isset( $wp->query_vars['gatherpress_ics'] ) ) {
			$slug = $wp->query_vars['name'] ?? null;
			$post = get_page_by_path( $slug, OBJECT, Event::POST_TYPE );

			if ( $post ) {
				$event = new Event( $post->ID );

				header( 'Content-Type: text/calendar; charset=utf-8' );
				header( 'Content-Disposition: attachment; filename="' . get_post_field( 'post_name', $post->ID ) . '.ics"' );

				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- ICS content is safely generated and must not be escaped.
				echo $event->get_ics_calendar_string();
				exit;
			}

			wp_die( esc_html__( 'Event not found.', 'gatherpress' ), '', array( 'response' => 404 ) );
		}
	}

	/**
	 * Checks and updates the waiting list for the given event.
	 *
	 * This function initializes an RSVP object for the given post ID
	 * and checks the waiting list associated with that post.
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id The ID of the post for which the waiting list should be checked.
	 * @return void
	 */
	public function check_waiting_list( int $post_id ): void {
		$rsvp = new Rsvp( $post_id );

		$rsvp->check_waiting_list();
	}

	/**
	 * Delete event record from custom table when an event is deleted.
	 *
	 * This method is called when an event post is deleted, and it ensures that the corresponding
	 * record in the custom table associated with the event is also deleted.
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id An event post ID.
	 * @return void
	 */
	public function delete_event( int $post_id ): void {
		global $wpdb;

		if ( Event::POST_TYPE !== get_post_type( $post_id ) ) {
			return;
		}

		$table = sprintf( Event::TABLE_FORMAT, $wpdb->prefix );

		$wpdb->delete( // phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching
			$table,
			array(
				'post_id' => $post_id,
			)
		);
	}

	/**
	 * Populate custom columns for Event post type in the admin dashboard.
	 *
	 * Displays additional information, like event datetime, for Event post types.
	 *
	 * @since 1.0.0
	 *
	 * @param string $column  The name of the column to display.
	 * @param int    $post_id The current post ID.
	 * @return void
	 *
	 * @throws Exception If initializing Event object fails, due to invalid post ID or database issues.
	 */
	public function custom_columns( string $column, int $post_id ): void {
		if ( 'datetime' !== $column ) {
			return;
		}

		$event = new Event( $post_id );

		echo esc_html( $event->get_display_datetime() );
	}

	/**
	 * Set custom columns for Event post type in the admin dashboard.
	 *
	 * This method is used to define custom columns for Event post types in the WordPress admin dashboard.
	 * It adds an additional column for displaying event date and time.
	 *
	 * @since 1.0.0
	 *
	 * @param array $columns An associative array of column headings.
	 * @return array An updated array of column headings, including the custom columns.
	 */
	public function set_custom_columns( array $columns ): array {
		$placement = 2;
		$insert    = array(
			'datetime' => __( 'Event date &amp; time', 'gatherpress' ),
		);

		return array_slice( $columns, 0, $placement, true ) + $insert + array_slice( $columns, $placement, null, true );
	}

	/**
	 * Make custom columns sortable for Event post type in the admin dashboard.
	 *
	 * This method allows the custom columns, including the 'Event date & time' column,
	 * to be sortable in the WordPress admin dashboard for Event post types.
	 *
	 * @since 1.0.0
	 *
	 * @param array $columns An array of sortable columns.
	 * @return array An updated array of sortable columns.
	 */
	public function sortable_columns( array $columns ): array {
		// Add 'datetime' as a sortable column.
		$columns['datetime'] = 'datetime';

		return $columns;
	}

	/**
	 * Returns the event date instead of the publish date for events.
	 *
	 * This method retrieves the event date based on plugin settings, replacing the publish date
	 * for event posts when appropriate.
	 *
	 * @since 1.0.0
	 *
	 * @param string $the_date The formatted date.
	 * @return string The event date as a formatted string.
	 *
	 * @throws Exception If initializing the Event object fails or event data cannot be retrieved.
	 */
	public function get_the_event_date( string $the_date ): string {
		$settings       = Settings::get_instance();
		$use_event_date = $settings->get_value( 'general', 'general', 'post_or_event_date' );

		// Check if the post is of the 'Event' post type and if event date should be used.
		if ( Event::POST_TYPE !== get_post_type() || 1 !== intval( $use_event_date ) ) {
			return $the_date;
		}

		// Get the event date and return it as the formatted date.
		$event = new Event( get_the_ID() );

		return $event->get_display_datetime();
	}

	/**
	 * Add Upcoming and Past Events display states to assigned pages.
	 *
	 * This method adds custom display states to assigned pages for "Upcoming Events" and "Past Events"
	 * based on the plugin settings. It checks if the current post object corresponds to any of the assigned
	 * pages and adds display states accordingly.
	 *
	 * @since 1.0.0
	 *
	 * @param array   $post_states An array of post display states.
	 * @param WP_Post $post        The current post object.
	 * @return array An updated array of post display states with custom labels if applicable.
	 */
	public function set_event_archive_labels( array $post_states, WP_Post $post ): array {
		// Retrieve plugin general settings.
		$general = get_option( Utility::prefix_key( 'general' ) );
		$pages   = $general['pages'] ?? '';

		if ( empty( $pages ) || ! is_array( $pages ) ) {
			return $post_states;
		}

		// Define archive pages for "Upcoming Events" and "Past Events".
		$archive_pages = array(
			'past_events'     => json_decode( $pages['past_events'] ),
			'upcoming_events' => json_decode( $pages['upcoming_events'] ),
		);

		// Check if the current post corresponds to any assigned archive page and add display states.
		foreach ( $archive_pages as $key => $value ) {
			if ( ! empty( $value ) && is_array( $value ) ) {
				$page = $value[0];

				if ( $page->id === $post->ID ) {
					$post_states[ Utility::prefix_key( $key ) ] = sprintf( 'GatherPress %s', $page->value );
				}
			}
		}

		return $post_states;
	}

	/**
	 * Set the date and time metadata for an event post.
	 *
	 * This method checks if the given post ID is for an event post, retrieves the
	 * associated 'gatherpress_datetime' metadata, and processes the date/time and
	 * timezone information. It then saves the event's date and time details.
	 *
	 * @since 1.0.0
	 *
	 * @param int $post_id The ID of the post being saved.
	 *
	 * @return void
	 */
	public function set_datetimes( int $post_id ): void {
		if ( Event::POST_TYPE !== get_post_type( $post_id ) ) {
			return;
		}

		$data = get_post_meta( $post_id, 'gatherpress_datetime', true );

		if ( empty( $data ) ) {
			return;
		}

		$data = json_decode( (string) $data, true ) ?? array();

		$event  = new Event( $post_id );
		$params = array(
			'post_id'        => $post_id,
			'datetime_start' => $data['dateTimeStart'] ?? '',
			'datetime_end'   => $data['dateTimeEnd'] ?? '',
			'timezone'       => $data['timezone'] ?? '',
		);

		$event->save_datetimes( $params );
	}
}
