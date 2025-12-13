import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Retrieves the mapping of placeholder tags to their associated values.
 *
 * @param {Object} post The current post object from the editor.
 * @param {Object} meta The meta values object from the editor.
 * @returns {Object} Mapping of placeholder strings to replacement values.
 */
const getPlaceholderValues = (title, meta) => ({
    '{eventdate}': meta?.gatherpress_datetime?.dateTimeStart || '',
    '{post_title}': title || '',
    '{venue_name}': meta?.venue_name || '',
    '{venue_city}': meta?.venue_city || '',
});

/**
 * Builds a slug by replacing placeholders found in a scheme with their corresponding values.
 *
 * @param {string} scheme The permalink scheme string containing placeholders.
 * @param {Object} placeholderValues An object mapping placeholders (e.g. '{venue_name}') to values.
 * @returns {string} The generated slug, formatted and sanitized for URLs.
 */
const buildSlugFromScheme = (scheme, placeholderValues) => {
    let slug = scheme;
    // Replace each defined placeholder with its value, slugified for URLs.
    Object.entries(placeholderValues).forEach(([ph, val]) => {
        // Basic slugify: lowercase, replace spaces, remove non-alphanumerics except dashes
        const clean = (val || '').toString().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        slug = slug.replace(ph, clean);
    });
    // Remove unused placeholders and clean up
    return slug.replace(/\{[^}]+\}/g, '').replace(/^-+|-+$/g, '').replace(/_+/g, '_');
};

/**
 * React component that observes relevant post and meta attributes in the block editor,
 * and updates the post slug in the editor UI based on a customizable permalink scheme.
 *
 * The slug change is only in the Block Editor session, not persisted to the DB until the user updates/saves.
 * The scheme is expected to be passed in (e.g. using wp_localize_script).
 *
 * @function PermalinkUpdater
 * @returns {null} No rendered UI.
 */
export default function PermalinkUpdater() {
    // Retrieve the current post, post meta, and slug from the editor.
    const post = useSelect(select => select('core/editor').getCurrentPost(), []);
    const title = useSelect(select => select('core/editor').getEditedPostAttribute('title'), []);
    const meta = useSelect(select => select('core/editor').getEditedPostAttribute('meta'), []);
    const slug = useSelect(select => select('core/editor').getEditedPostAttribute('slug'), []);
    const { editPost } = useDispatch('core/editor');

    // Replace with value injected by PHP, e.g. window.wpPermalinkScheme
    const permalinkScheme = window.wpPermalinkScheme || '{eventdate}_{post_title}_{venue_name}_{venue_city}';

    useEffect(() => {
        if (!post || !meta) return;
console.log(post);
console.log(JSON_decode(meta?.gatherpress_datetime));
        // Build values for each placeholder in the scheme
        const values = getPlaceholderValues(title, meta);
        // Construct new slug by applying scheme
        const newSlug = buildSlugFromScheme(permalinkScheme, values);
        // If the slug has changed and is not empty, update in the editor UI
        if (slug !== newSlug && newSlug) {
            editPost({ slug: newSlug });
        }
    }, [
        // post?.title?.raw,
        title,
        meta?.gatherpress_datetime,
        meta?.venue_name,
        meta?.venue_city,
        permalinkScheme
    ]);

    // Component does not render visible UI, only side effects.
    return null;
}