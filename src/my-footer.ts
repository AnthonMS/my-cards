/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	LitElement,
	html,
	customElement,
	property,
	CSSResult,
	TemplateResult,
	css,
	PropertyValues,
	internalProperty,
} from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js'
import {
	HomeAssistant,
	hasConfigOrEntityChanged,
	hasAction,
	ActionHandlerEvent,
	handleAction,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types
import { subscribeRenderTemplate } from 'card-tools/src/templates'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import type { MyFooterCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { FOOTER_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
	`%c  ---- MY-FOOTER ---- \n%c  ${localize('common.version')} ${FOOTER_VERSION}    `,
	'color: orange; font-weight: bold; background: black',
	'color: white; font-weight: bold; background: green',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
	type: 'my-footer',
	name: 'Footer Card',
	description: 'Custom Footer Card for Lovelace.',
});

// TODONE Name your custom element
@customElement('my-footer')
export class MyFooter extends LitElement {

	public static getStubConfig(): object {
		return {};
	}

	static get properties() {
		return {
			hass: {},
			config: {},
			active: {}
		};
	}

	@property({ attribute: false }) public hass!: HomeAssistant;
	@internalProperty() private config!: MyFooterCardConfig;

	// https://lit-element.polymer-project.org/guide/properties#accessors-custom
	public setConfig(config: MyFooterCardConfig): void {

		// Run the content through a Jinja2 parser function and create new config field 'parsed_content'
		this.applyTemplate(config.content ? config.content : '')
			.then(res => {
				// .replace(/\n/g, '<br>\n')
				// console.log('Parsed:', '"' + Response + '"')

				this.config = {
					name: 'MyFooter',
					parsed_content: res,
					disabled_scroll: false,
					...config,
				}
			})

		// // Old code to set config, use if not parsing jinja2
		// this.config = {
		// 	name: 'MyFooter',
		// 	...config,
		// };
	}

	// https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
	protected shouldUpdate(changedProps: PropertyValues): boolean {
		if (!this.config) {
			return false;
		}
		// console.log('Should Update!')

		return hasConfigOrEntityChanged(this, changedProps, false);
	}

	// https://lit-element.polymer-project.org/guide/templates
	protected render(): TemplateResult | void {
		// var minBar = this.config.minBar ? this.config.minBar : 0;
		// console.log("Test-Card Config:", this.config)

		// -- Make copy of the config, this way we can add empty -- //
		// -- objects and save ourselves a lot of if statements -- //
		var conf = JSON.parse(JSON.stringify(this.config));
		// console.log('CONFIG:::', conf)
		// const entityId = this.config.test_entity ? this.config.test_entity : "ERROR: NO ENTITY ID"
		// const entityName = this.config.test_entity?.split(".")[1]
		// const entity = this.hass.states[`${entityId}`]
		// console.log('Entity Name:', entityName)
		// console.log('Entity:', entity)
		// conf.buttons[0]

		const styles = conf.styles ? conf.styles : {}
		const buttons = conf.buttons ? conf.buttons : []

		// Parse Styling for Container
		let containerStyles = styles.container ? styles.container : {}
		containerStyles.height = containerStyles.height ? containerStyles.height : '75px'
		containerStyles.width = containerStyles.width ? containerStyles.width : '100%'
		containerStyles.borderRadius = containerStyles.borderRadius ? containerStyles.borderRadius : "10px"
		containerStyles.backgroundColor = containerStyles.backgroundColor ? containerStyles.backgroundColor : "var(--paper-card-background-color)"

		// Parse Styling for Text
		let textStyles = styles.text ? styles.text : {}
		textStyles.padding = textStyles.padding ? textStyles.padding : '15px 20px'
		textStyles.maxWidth = textStyles.maxWidth ? textStyles.maxWidth : '50%'
		textStyles.color = textStyles.color ? textStyles.color : 'white'

		// Function to convert Styling Object to Styling String
		const styleToString = (style): String => {
			return Object.keys(style).reduce((acc, key) => (
				acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
			), '');
		}

		const toggleScroll = () => {
			this.config.disabled_scroll = !this.config.disabled_scroll
			if (this.config.disabled_scroll) {
				disableBodyScroll(window)
			} else {
				enableBodyScroll(window)
			}
		}

		return html`
			<ha-card>
				<div class="footer-container" style="${styleToString(containerStyles)}">
					<div class="text-container" style="${styleToString(textStyles)}">
						<p>
							${unsafeHTML(this.config.parsed_content)}
						</p>
					</div>

					<div class="button-container">
						<div class="button">
							<ha-icon class="icon" icon="mdi:cog-outline" style=""
								@action=${e => {
									this._handleDynamicButton(e, {toggle: this.config.scroll_disabled})
									// console.log('Testing!!!')
									toggleScroll()
								}}
								.actionHandler=${actionHandler({
									hasHold: false,
									hasDoubleClick: false })} />
						</div>
						${
							buttons.map((item, index) => {
								return html`
									<div class="button">
										<ha-icon class="icon" key="${index}" icon="${item.button.icon}" style=""
											@action=${e => this._handleDynamicButton(e, item.button)}
											.actionHandler=${actionHandler({
												hasHold: hasAction(item.hold_action),
												hasDoubleClick: hasAction(item.double_tap_action) })} />
									</div>
								`
							})
						}
					</div>
				</div>
			</ha-card>
		`;

	}

	private _handleDynamicButton(ev: ActionHandlerEvent, buttonConfig: Object): void {
		// console.log('Dynamic Button Hanlder Triggered', ev)
		// console.log('ButtonConfig:', buttonConfig)
		if (this.hass && buttonConfig && ev.detail.action) {
			handleAction(this, this.hass, buttonConfig, ev.detail.action);
		}
	}


	private _handleAction(ev: ActionHandlerEvent): void {
		if (this.hass && this.config && ev.detail.action) {
			handleAction(this, this.hass, this.config, ev.detail.action);
		}
	}


	  // Promisified wrapper around subscribeRenderTemplate to allow this to be called as an async function
	private parseTemplate(template, variables): Promise<string> {
		return new Promise((resolve, reject) => {
			let unsubRenderTemplate = subscribeRenderTemplate(null,
				async (result) => {
					resolve(result);
				},
				{template: template, variables: variables,
				entity_ids: []}, false);
				let unsub = console.log;

				// Catch any errors and unsubscribe
				(async () => {
					try {
						unsub = await unsubRenderTemplate;
						await unsub();
					} catch (e) {
					reject(e.message);
					}
			})();
		})
	}

	private async applyTemplate(template): Promise<string>{
		try{
				const _templateVariables = {
					user: {
						name: 'Anthon',
						is_admin: true,
						is_owner: true
					},
					page: {
						...location,
						path: location.pathname
					},
					// theme: this.hass.selectedTheme ? this.hass.selectedTheme : this.hass.themes.default_theme
					theme: 'Dark - Wooden'
				}

				var result = await this.parseTemplate(template, _templateVariables);
				return result;
		}
		catch(err){
				console.error("Error parsing template.", err);
				console.log("Template", template);
				return "Error!";
		}
	}


	// https://lit-element.polymer-project.org/guide/styles
	static get styles(): CSSResult {
		return css`
			.footer-container {
				display: flex;
			}

			.text-container {

			}
			.text-container p {
				border: inherit;
				margin: 0;
				padding: 0;
			}

			.button-container {
				flex-grow: 1;
				padding-right: 20px;
			}
			.icon {
				border: 0px solid red;
				border-radius: 5px;
				height: 50px;
				width: 50px;
				font-size: 20px;
				display: flex;
				justify-content: center;
				align-items: center;
				transition: 250ms all;
				background: rgba(0,0,0,0.15);
				box-shadow: 10px 10px 28px 4px rgba(0,0,0,0.3);
			}
			.icon:hover {
				cursor: pointer;
				background-color: rgba(0,0,0,0.25);
			}
			.button-container .button {
				height: 100%;
				float: right;
				margin: 0 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		`;
	}
}
