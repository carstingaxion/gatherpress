<?php
/**
 * Template for GatherPress RSVPs
 *
 * This template is used to render ... to the browser.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit; // @codeCoverageIgnore

?>

<?php if ( ! is_user_logged_in() && ! is_admin() ) : ?>
<!-- wp:paragraph -->
<p>You must Login to RSVP to events.</p>
<!-- /wp:paragraph -->

<!-- wp:loginout /-->
<?php endif; ?>

<?php if ( is_user_logged_in() ) : ?>
<!-- wp:paragraph -->
<p>Fortunately the RSVP block knowes about the queried event, here on the endpoint.</p>
<!-- /wp:paragraph -->
<!-- wp:gatherpress/rsvp /-->
<?php endif; ?>