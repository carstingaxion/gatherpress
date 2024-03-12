/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	RadioControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies.
 */
import MapEmbed from '../../components/MapEmbed';
import VenueOrOnlineEvent from '../../components/VenueOrOnlineEvent';
import EditCover from '../../components/EditCover';
import { isVenuePostType } from '../../helpers/venue';
import VenueSelector from '../../components/VenueSelector';
import VenueInformation from '../../panels/venue-settings/venue-information';
import OnlineEventLink from '../../components/OnlineEventLink';
import { Listener } from '../../helpers/broadcasting';
import { isEventPostType } from '../../helpers/event';
import { isSinglePostInEditor } from '../../helpers/globals';

/**
 * Edit component for the GatherPress Venue block.
 *
 * This component renders the edit view of the GatherPress Venue block in the WordPress block editor.
 * It provides an interface for users to add and configure venue information, including map settings.
 * The component includes controls for selecting a venue, entering venue details, and configuring map display options.
 *
 * @since 1.0.0
 *
 * @param {Object}   props               - Component properties.
 * @param {Object}   props.attributes    - Block attributes.
 * @param {Function} props.setAttributes - Function to set block attributes.
 * @param {boolean}  props.isSelected    - Flag indicating if the block is selected in the editor.
 *
 * @return {JSX.Element} The rendered React component.
 */
const Edit = ({ attributes, setAttributes, isSelected, context }) => {
	const { mapZoomLevel, mapType, mapHeight } = attributes;
	const [name, setName] = useState('');
	const [fullAddress, setFullAddress] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [website, setWebsite] = useState('');
	const [isOnlineEventTerm, setIsOnlineEventTerm] = useState(false);
	const blockProps = useBlockProps();
	// const onlineEventLink = useSelect(
	// 	(select) =>
	// 		select('core/editor')?.getEditedPostAttribute('meta')
	// 			?.online_event_link
	// );

	let { mapShow } = attributes;

	// console.log(context);

/* 
	const endpoint =
		getFromGlobal('urls.eventRestApi') +
		`/events-list?event_list_type=${type}&max_number=${maxNumberOfEvents}&datetime_format=${datetimeFormat}&topics=${topicsString}&venues=${venuesString}`;


	apiFetch({
		path: endpoint,
	}).then((data) => {
		setLoaded(true);
		setEvents(data);
	});
 */



const {
	eventPost,
	venueTaxonomy,
	venuePosts,
	venueInformationMeta,
	onlineEventLink,
} = useSelect(
	( select ) => {
		const { getEntityRecord }  = select( coreStore );
		const { getEntityRecords } = select( coreStore );
		
		const eventPost = getEntityRecord(
			'postType',
			context.postType,
			context.postId
		);
		const venueTaxonomy = getEntityRecord(
			'taxonomy',
			'_gp_venue',
			eventPost?._gp_venue
		);

		let venuePosts = null;
		if ( typeof venueTaxonomy !== 'undefined' ) {
			venuePosts = getEntityRecords(
				'postType',
				'gp_venue',
				{
					slug: venueTaxonomy.slug.substring(1)
				}
			);
		}
// If is 'online-event'
		let venueInformationMeta = false;
		let onlineEventLink = false;
		if ( null !== venuePosts && typeof venuePosts[0] !== 'undefined' ) {
			venueInformationMeta = venuePosts[0].meta.venue_information;
		} else {
			setIsOnlineEventTerm();
			onlineEventLink = eventPost?.meta?.online_event_link;

		}
		
		return {
			eventPost,
			venueTaxonomy,
			venuePosts,
			venueInformationMeta,
			onlineEventLink
		};
	},
	[
		context,
	]
);


console.log(eventPost);
console.log(venueTaxonomy);
// if ( undefined !== venueTaxonomy )
	console.log(venuePosts);
	console.log(venueInformationMeta);
	console.log(onlineEventLink);






	let venueInformationMetaData;

	if (venueInformationMeta) {
		venueInformationMetaData = JSON.parse(venueInformationMeta);
	} else {
		venueInformationMetaData = {};
	}

	if (mapShow && fullAddress) {
		mapShow = true;
	}

	if (mapShow && !isSinglePostInEditor()) {
		mapShow = true;
	}

	Listener({
		setName,
		setFullAddress,
		setPhoneNumber,
		setWebsite,
		setIsOnlineEventTerm,
	});

	useEffect(() => {
		setFullAddress(venueInformationMetaData.fullAddress); // TODO
		if (isVenuePostType()) {
			setFullAddress(venueInformationMetaData.fullAddress);
			setPhoneNumber(venueInformationMetaData.phoneNumber);
			setWebsite(venueInformationMetaData.website);

			if (!fullAddress && !phoneNumber && !website) {
				setName(__('Add venue information.', 'gatherpress'));
			} else {
				setName('');
			}
		}

		if (isEventPostType() || !isSinglePostInEditor()) {
			if (!fullAddress && !phoneNumber && !website) {
				setName(__('No venue selected.', 'gatherpress'));
			} else {
				// setName('');
			}
		}
	}, [
		venueInformationMetaData.fullAddress,
		venueInformationMetaData.phoneNumber,
		venueInformationMetaData.website,
		fullAddress,
		phoneNumber,
		website,
	]);

	return (
		<>
			<InspectorControls>
				{isSinglePostInEditor() && ( isEventPostType() || isVenuePostType() ) && (
					<PanelBody
						title={__('Venue settings', 'gatherpress')}
						initialOpen={true}
					>
						<PanelRow>
							{/* {!isVenuePostType() && <VenueSelector />} */}
							{isEventPostType() && <VenueSelector />}
							{isVenuePostType() && <VenueInformation />}
						</PanelRow>
						{isOnlineEventTerm && (
							<PanelRow>
								<OnlineEventLink />
							</PanelRow>
						)}
					</PanelBody>
				)}
				{!isOnlineEventTerm && (
					<PanelBody
						title={__('Map settings', 'gatherpress')}
						initialOpen={true}
					>
						<PanelRow>
							{__('Show map on venue', 'gatherpress')}
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={
									mapShow
										? __('Display the map', 'gatherpress')
										: __('Hide the map', 'gatherpress')
								}
								checked={mapShow}
								onChange={(value) => {
									setAttributes({ mapShow: value });
								}}
							/>
						</PanelRow>
						{mapShow && (
							<>
								<RangeControl
									label={__('Zoom level', 'gatherpress')}
									beforeIcon="search"
									value={mapZoomLevel}
									onChange={(value) =>
										setAttributes({ mapZoomLevel: value })
									}
									min={1}
									max={22}
								/>
								<RadioControl
									label={__('Map type', 'gatherpress')}
									selected={mapType}
									options={[
										{
											label: __('Roadmap', 'gatherpress'),
											value: 'm',
										},
										{
											label: __('Satellite', 'gatherpress'),
											value: 'k',
										},
									]}
									onChange={(value) => {
										setAttributes({ mapType: value });
									}}
								/>
								<RangeControl
									label={__('Map height', 'gatherpress')}
									beforeIcon="location"
									value={mapHeight}
									onChange={(height) =>
										setAttributes({ mapHeight: height })
									}
									min={100}
									max={1000}
								/>
							</>							
						)}
						</PanelBody>
				)}
			</InspectorControls>

			<div {...blockProps}>
				<EditCover isSelected={isSelected}>
					<div className="gp-venue">
						<VenueOrOnlineEvent
							name={name}
							fullAddress={fullAddress}
							phoneNumber={phoneNumber}
							website={website}
							isOnlineEventTerm={isOnlineEventTerm}
							onlineEventLink={onlineEventLink}
						/>
						{mapShow && (
							<MapEmbed
								location={fullAddress}
								zoom={mapZoomLevel}
								type={mapType}
								height={mapHeight}
							/>
						)}
					</div>
				</EditCover>
			</div>
		</>
	);
};

export default Edit;
