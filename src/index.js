import { registerBlockExtension } from "@10up/block-components";
import { InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	SelectControl,
} from "@wordpress/components";

import "./style.scss";
import "./editor.scss";

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

const BlockEdit = (props) => {
	const setResponsiveSettings = (value) => {
		props.setAttributes({ hasResponsiveSettings: value });
	};

	const setResponsiveDisplay = (value) => {
		props.setAttributes({ hasResponsiveDisplay: value });
	};

	return (
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
							label="Responsive Display"
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
	);
};

const generateClassName = (attributes) => {
	let string = "";
	if (attributes.hasResponsiveSettings && attributes.hasResponsiveDisplay) {
		string += `has-responsive-settings has-responsive-display-${attributes.hasResponsiveDisplay}`;
	}
	return string;
};

registerBlockExtension(["core/group", "core/column"], {
	extensionName: "responsive-settings",
	attributes: additionalAttributes,
	classNameGenerator: generateClassName,
	Edit: BlockEdit,
});
