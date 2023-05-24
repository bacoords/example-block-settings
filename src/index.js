import { registerBlockExtension } from "@10up/block-components";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";

import "./style.scss";

/**
 * additional block attributes object
 *
 * @link https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#attributes
 */
const additionalAttributes = {
	hasResponsiveSettings: {
		type: "boolean",
		default: false,
	},
	hasResponsiveDisplay: {
		type: "string",
		default: "all",
	},
};

/**
 * BlockEdit
 *
 * a react component that will get mounted in the Editor when the block is
 * selected. It is recommended to use Slots like `BlockControls` or `InspectorControls`
 * in here to put settings into the blocks toolbar or sidebar.
 *
 * @link https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-edit-save.md#edit
 *
 * @param {object} props block props
 * @returns {JSX}
 */
function BlockEdit(props) {
	function setResponsiveSettings(value) {
		props.setAttributes({ hasResponsiveSettings: value });
	}

	function setResponsiveDisplay(value) {
		props.setAttributes({ hasResponsiveDisplay: value });
	}
	return (
		<>
			<InspectorControls>
				<PanelBody title="Responsive Settings">
					<PanelRow>
						<ToggleControl
							label="Enable Responsive Settings"
							checked={props.attributes.hasResponsiveSettings}
							onChange={setResponsiveSettings}
						/>
					</PanelRow>
					{props.attributes.hasResponsiveSettings && (
						<PanelRow>
							<SelectControl
								label="Display on"
								labelPosition="left"
								value={props.attributes.hasResponsiveDisplay}
								options={[
									{ label: "All Sizes", value: "all" },
									{ label: "Small Only", value: "small" },
									{ label: "Small and Medium", value: "small-medium" },
									{ label: "Medium Only", value: "medium" },
									{ label: "Medium and Large", value: "medium-large" },
									{ label: "Large Only", value: "large" },
								]}
								onChange={setResponsiveDisplay}
							/>
						</PanelRow>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

/**
 * generateClassNames
 *
 * a function to generate the new className string that should get added to
 * the wrapping element of the block.
 *
 * @param {object} attributes block attributes
 * @returns {string}
 */
function generateClassNames(attributes) {
	let string = "";
	if (attributes.hasResponsiveSettings && attributes.hasResponsiveDisplay) {
		string += ` has-responsive-settings has-responsive-settings-${attributes.hasResponsiveDisplay} `;
	}
	return string;
}

/**
 * registerBlockExtension
 *
 * a function that will register the block extension with the block components
 * library.
 *
 * @link https://github.com/10up/block-components/tree/develop/api/register-block-extension
 *
 * @param {array} blocks array of blocks to extend
 * @param {object} options extension options
 */
registerBlockExtension(["core/group", "core/column"], {
	extensionName: "responsive-settings",
	attributes: additionalAttributes,
	classNameGenerator: generateClassNames,
	Edit: BlockEdit,
	order: "before",
});
