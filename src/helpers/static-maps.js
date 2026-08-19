import { addFilter } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Adds a GatherPress map binding toggle to image/cover block inspectors.
 *
 * @param {Function} BlockEdit - Original block edit component.
 * @returns {Function} Wrapped component.
 */
function withMapBindingControls( BlockEdit ) {
    return ( props ) => {
        const { name, attributes, setAttributes } = props;

        if ( ! [ 'core/image', 'core/cover' ].includes( name ) ) {
            return <BlockEdit { ...props } />;
        }

        const hasBinding =
            attributes.metadata?.bindings?.url?.source === 'gatherpress/map-image';

        const toggleBinding = ( enabled ) => {
            if ( enabled ) {
                setAttributes( {
                    metadata: {
                        ...( attributes.metadata || {} ),
                        bindings: {
                            ...( attributes.metadata?.bindings || {} ),
                            url: {
                                source: 'gatherpress/map-image',
                                args: { zoom: 14, width: 800, height: 400 },
                            },
                            alt: {
                            },
                        },
                    },
                } );
            } else {
                const { url, alt, ...remainingBindings } =
                    attributes.metadata?.bindings || {};
                setAttributes( {
                    metadata: {
                        ...attributes.metadata,
                        bindings: remainingBindings,
                    },
                } );
            }
        };

        return (
            <>
                <BlockEdit { ...props } />
                <InspectorControls>
                    <PanelBody title={ __( 'GatherPress Map', 'gatherpress' ) }>
                        <ToggleControl
                            label={ __( 'Use venue map image', 'gatherpress' ) }
                            checked={ hasBinding }
                            onChange={ toggleBinding }
                        />
                        { hasBinding && (
                            <RangeControl
                                label={ __( 'Zoom level', 'gatherpress' ) }
                                value={
                                    attributes.metadata?.bindings?.url?.args
                                        ?.zoom ?? 14
                                }
                                onChange={ ( zoom ) =>
                                    setAttributes( {
                                        metadata: {
                                            ...attributes.metadata,
                                            bindings: {
                                                ...attributes.metadata.bindings,
                                                url: {
                                                    ...attributes.metadata
                                                        .bindings.url,
                                                    args: {
                                                        ...attributes.metadata
                                                            .bindings.url.args,
                                                        zoom,
                                                    },
                                                },
                                            },
                                        },
                                    } )
                                }
                                min={ 1 }
                                max={ 20 }
                            />
                        ) }
                    </PanelBody>
                </InspectorControls>
            </>
        );
    };
}

addFilter(
    'editor.BlockEdit',
    'gatherpress/map-binding-controls',
    withMapBindingControls
);

console.log( 'GatherPress map binding controls added to image and cover blocks.' );