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
import {
	HomeAssistant,
	hasConfigOrEntityChanged,
	hasAction,
	ActionHandlerEvent,
	handleAction,
	LovelaceCardEditor,
	getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types

import './editor';

import type { BoilerplateCardConfig } from './types';
import { actionHandler } from './action-handler-directive';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
	`%c  MY-SLIDER \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
	'color: orange; font-weight: bold; background: green',
	'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
	type: 'my-slider',
	name: 'Slider Card',
	description: 'Custom Slider Card for Lovelace.',
});

// TODONE Name your custom element
@customElement('my-slider')
export class MySlider extends LitElement {

	public static async getConfigElement(): Promise<LovelaceCardEditor> {
		return document.createElement('boilerplate-card-editor');
	}

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
	@internalProperty() private config!: BoilerplateCardConfig;

	// https://lit-element.polymer-project.org/guide/properties#accessors-custom
	public setConfig(config: BoilerplateCardConfig): void {
		
		if (!config.entity) {
			throw new Error("You need to define entity");
		}
	
		if (!config.entity.includes("input_number.") && !config.entity.includes("light.") && !config.entity.includes("media_player.") && !config.entity.includes("cover.") && !config.entity.includes("fan.") && !config.entity.includes("switch.") && !config.entity.includes("lock.") ) {
			throw new Error("Entity has to be a light, input_number, media_player, cover or a fan.");
		}

		this.config = {
			name: 'MySlider',
			...config,
		};
	}

	// https://lit-element.polymer-project.org/guide/lifecycle#shouldupdate
	protected shouldUpdate(changedProps: PropertyValues): boolean {
		if (!this.config) {
			return false;
		}

		return hasConfigOrEntityChanged(this, changedProps, false);
	}

	// https://lit-element.polymer-project.org/guide/templates
	protected render(): TemplateResult | void {
		// var minBar = this.config.minBar ? this.config.minBar : 0;
		// console.log("Test-Card Config:", this.config)

		// -- Make copy of the config, this way we can add empty -- //
		// -- objects and save ourselves a lot of if statements -- //
		var conf = JSON.parse(JSON.stringify(this.config));
		const entityId = this.config.entity ? this.config.entity : "ERROR: NO ENTITY ID"
		const entityName = this.config.entity?.split(".")[1]
		const entity = this.hass.states[`${entityId}`]

  		// // Size Variables
		var step = conf.step ? conf.step: "1";
		if (entityId.includes("input_number.")) {
			step = conf.step ? conf.step: entity.attributes.step;
		}
		var minBar = conf.minBar ? conf.minBar : 0;
		var maxBar = conf.maxBar ? conf.maxBar : 100;
		var minSet = conf.minSet ? conf.minSet : 0;
		var maxSet = conf.maxSet ? conf.maxSet : 100;
		var width = conf.width ? conf.width : "100%";
		var height = conf.height ? conf.height : "50px";
		var radius = conf.radius ? conf.radius : "4px";
		var top = conf.top ? conf.top : "0px";
		var bottom = conf.bottom ? conf.bottom : "0px";
		var right = conf.right ? conf.right : "0px";
		var left = conf.left ? conf.left : "0px";
		var rotate = conf.rotate ? conf.rotate : "0";
		var containerHeight = conf.containerHeight ? conf.containerHeight : height;
		if (rotate != "0") {
			rotate = rotate + "deg";
		}
		// Slider Background Color Variables
		var mainSliderColor = conf.mainSliderColor ? conf.mainSliderColor : "var(--accent-color)";
		var secondarySliderColor = conf.secondarySliderColor ? conf.secondarySliderColor : "#4d4d4d";
		var mainSliderColorOff = conf.mainSliderColorOff ? conf.mainSliderColorOff : "#636363";
		var secondarySliderColorOff = conf.secondarySliderColorOff ? conf.secondarySliderColorOff : "#4d4d4d";
		var border = conf.border ? conf.border : "0";
		// Slider Thumb Variables
		var thumbWidth = conf.thumbWidth ? conf.thumbWidth : "25px";
		var thumbHeight = conf.thumbHeight ? conf.thumbHeight : "80px";
		var thumbColor = conf.thumbColor ? conf.thumbColor : "#FFFFFF";
		var thumbColorOff = conf.thumbColorOff ? conf.thumbColorOff : "#969696";
		var thumbHorizontalPadding = conf.thumbHorizontalPadding ? conf.thumbHorizontalPadding : "10px";
		var thumbVerticalPadding = conf.thumbVerticalPadding ? conf.thumbVerticalPadding : "20px";
		var thumbTop = conf.thumpTop ? conf.thumpTop : "calc((var(--slider-width) - var(--thumb-height)) / 2)";
		var thumbBorderRight = conf.thumbBorderRight ? conf.thumbBorderRight : "var(--thumb-horizontal-padding) solid var(--slider-main-color)";
		var thumbBorderLeft = conf.thumbBorderLeft ? conf.thumbBorderLeft : "var(--thumb-horizontal-padding) solid var(--slider-main-color)";
		var thumbBorderTop = conf.thumbBorderTop ? conf.thumbBorderTop : "var(--thumb-vertical-padding) solid var(--slider-main-color)";
		var thumbBorderBotton = conf.thumbBorderBotton ? conf.thumbBorderBotton : "var(--thumb-vertical-padding) solid var(--slider-main-color)";
		// top: calc((var(--slider-width) - var(--thumb-height)) / 2);
		// border-right: var(--thumb-horizontal-padding) solid var(--slider-main-color);
		// border-left: var(--thumb-horizontal-padding) solid var(--slider-main-color);
		// border-top: var(--thumb-vertical-padding) solid var(--slider-main-color);
		// border-bottom: var(--thumb-vertical-padding) solid var(--slider-main-color);


		// var entity = this.config.entity;
		// var entityClass = this.hass.states[entity]


		
		var styleStr = `
			--slider-width: ${width};
			--slider-width-inverse: -${width};
			--slider-height: ${height};
			--slider-main-color: ${(entity.state === "off" || entity.state === "locked" || entity.state == undefined) ? "var(--slider-main-color-off)" : "var(--slider-main-color-on)"};
			--slider-main-color-on: ${mainSliderColor};
			--slider-main-color-off: ${mainSliderColorOff};
			--slider-secondary-color: ${(entity.state === "off" || entity.state === "locked" || entity.state == undefined) ? "var(--slider-secondary-color-off)" : "var(--slider-secondary-color-on)"};
			--slider-secondary-color-on: ${secondarySliderColor};
			--slider-secondary-color-off: ${secondarySliderColorOff};
			--slider-radius: ${radius};
			--border: ${border};
			
			--thumb-width: ${thumbWidth};
			--thumb-height: ${thumbHeight};
			--thumb-color: ${(entity.state === "off" || entity.state == undefined) ? "var(--thumb-color-off)" : "var(--thumb-color-on)"};
			--thumb-color-on: ${thumbColor};
			--thumb-color-off: ${thumbColorOff};
			--thumb-horizontal-padding: ${thumbHorizontalPadding};
			--thumb-vertical-padding: ${thumbVerticalPadding};

			--rotate: ${rotate};
			--top: ${top};
			--bottom: ${bottom};
			--right: ${right};
			--left: ${left};
			--container-height: ${containerHeight};
			--thumb-top: ${thumbTop};
			--thumb-border-right: ${thumbBorderRight};
			--thumb-border-left: ${thumbBorderLeft};
			--thumb-border-top: ${thumbBorderTop};
			--thumb-border-bottom: ${thumbBorderBotton};
		`;

		if (entityId.includes("light.")) {
			if (conf.function == "Warmth") {
				return html`
					<ha-card>
						<div class="slider-container" style="${styleStr}">
							<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${entity.state === "off" ? 0 : entity.attributes.color_temp}" min="${entity.attributes.min_mireds}" max="${entity.attributes.max_mireds}" step="${step}" @change=${e => this._setWarmth(entity, e.target, minSet, maxSet)}>
						</div>
					</ha-card>
				`;
			}
			else {
				return html`
					<ha-card>
						<div class="slider-container" style="${styleStr}">
							<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${entity.state === "off" ? 0 : Math.round(entity.attributes.brightness / 2.55)}" step="${step}" @change=${e => this._setBrightness(entity, e.target, minSet, maxSet)}>
						</div>
					</ha-card>
				`;
			}
		}

		if (entityId.includes("input_number.")) {
			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${entity.state}" min="${entity.attributes.min}" max="${entity.attributes.max}" step="${step}" @change=${e => this._setInputNumber(entity, e.target, minSet, maxSet)}>
					</div>
				</ha-card>
			`;
		}

		if (entityId.includes("media_player.")) {
			var num = 0;
			if (entity.attributes.volume_level != undefined) {
				var num = Number(entity.attributes.volume_level * 100)
			}

			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${num}" min="${minBar}" max="${maxBar}" step="${step}" @change=${e => this._setMediaVolume(entity, e.target, minSet, maxSet)}>
					</div>
				</ha-card>
			`;
		}

		if (entityId.includes("cover.")) {
			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${entity.attributes.current_position}" min="${minBar}" max="${maxBar}" step="${step}" @change=${e => this._setCover(entity, e.target, minSet, maxSet)}>
					</div>
				</ha-card>
			`;
		}

		if (entityId.includes("fan.")) {
			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${entity.attributes.percentage}" min="${minBar}" max="${maxBar}" step="${step}" @change=${e => this._setFan(entity, e.target, minSet, maxSet)}>
					</div>
				</ha-card>
			`;
		}

		if (entityId.includes("switch.")) {
			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${minBar}" min="${minBar}" max="${maxBar}" step="${step}" @change=${e => this._setSwitch(entity, e.target, minSet, maxSet, minBar, maxBar)}>
					</div>
				</ha-card>
			`;
		}

		if (entityId.includes("lock.")) {
			return html`
				<ha-card>
					<div class="slider-container" style="${styleStr}">
						<input name="foo" type="range" class="${entity.state}" style="${styleStr}" .value="${minBar}" min="${minBar}" max="${maxBar}" step="${step}" @change=${e => this._setLock(entity, e.target, minSet, maxSet, minBar, maxBar)}>
					</div>
				</ha-card>
			`;
		}
	}

	

	private _handleAction(ev: ActionHandlerEvent): void {
		if (this.hass && this.config && ev.detail.action) {
			handleAction(this, this.hass, this.config, ev.detail.action);
		}
	}

	private _handleSliderAction(_entity, _target, _minSet, _maxSet): void {
		let val = _target.value
		if (val > _maxSet) {
		  val = _maxSet;
		} else if (val < _minSet) {
			val = _minSet;
		}
		
		this.hass.callService("light", "turn_on", {
			entity_id: _entity.entity_id,
			brightness: val * 2.55
		})

		_target.value = val

	}
	
	private _setBrightness(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
	
		this.hass.callService("homeassistant", "turn_on", {
			entity_id: _entity.entity_id,
			brightness: value * 2.55
		});
	
		_target.value = value;
	
	}
	
	private _setWarmth(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
	
		this.hass.callService("homeassistant", "turn_on", {
			entity_id: _entity.entity_id,
			color_temp: value
		});
	
		_target.value = value;
	}
	
	private _setInputNumber(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
	
		this.hass.callService("input_number", "set_value", {
			entity_id: _entity.entity_id,
			value: value
		});
	
		_target.value = value;
	}

	
	private _setFan(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
	
		this.hass.callService("fan", "set_percentage", {
			entity_id: _entity.entity_id,
			percentage: value
		});
	
		_target.value = value;
	}
	
	private _setCover(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
		
		this.hass.callService("cover", "set_cover_position", {
			entity_id: _entity.entity_id,
			position: value
		});
		
		_target.value = value;
	}
	
	private _setMediaVolume(_entity, _target, _minSet, _maxSet): void {
		var value = _target.value;
		if (value > _maxSet) {
			value = _maxSet;
		} else if (value < _minSet) {
			value = _minSet;
		}
	
		this.hass.callService("media_player", "volume_set", {
			entity_id: _entity.entity_id,
			volume_level: value / 100
		});
	
		_target.value = value;
	}
	
	private _setSwitch(_entity, _target, _minSet, _maxSet, _minBar, _maxBar): void {
		var value = _target.value;
		var threshold = Math.min(_maxSet, _maxBar) //pick lesser of the two
		if (Number(threshold) <= value) {
			this.hass.callService("homeassistant", "toggle", {
				entity_id: _entity.entity_id
			});
		}
	
		_target.value = Number(Math.max(_minSet, _minBar));
	}
	
	private _setLock(_entity, _target, _minSet, _maxSet, _minBar, _maxBar): void {
		var value = _target.value;
		var threshold = Math.min(_maxSet, _maxBar) //pick lesser of the two
		if (Number(threshold) <= value) {
			var newLockState = _entity.state === "locked" ? 'unlock' : 'lock'
			this.hass.callService("lock", newLockState, {
				entity_id: _entity.entity_id
			});
		}
	
		_target.value = Number(Math.max(_minSet, _minBar));
	}
	

	// https://lit-element.polymer-project.org/guide/styles
	static get styles(): CSSResult {
		return css`
			.slider-container {
				height: var(--container-height);
				position: relative;
				overflow: hidden;
				border-radius: var(--slider-radius);
			}
	  
			.slider-container input[type="range"] {
				outline: 0;
				border: var(--border);
				width: var(--slider-width);
				height: var(--slider-height);
				border-radius: var(--slider-radius);
				background-color: var(--slider-secondary-color); /*Remaining Slider color*/
				margin: 0;
				transition: box-shadow 0.2s ease-in-out;
				overflow: hidden;
				-webkit-appearance: none;
				position: absolute;
				top: var(--top);
				bottom: var(--bottom);
				right: var(--right);
				left: var(--left);
				-webkit-transform: rotate(var(--rotate));
				-moz-transform: rotate(var(--rotate));
				-o-transform: rotate(var(--rotate));
				-ms-transform: rotate(var(--rotate));
				transform: rotate(var(--rotate));
			}
	  
			.slider-container input[type="range"]::-webkit-slider-runnable-track {
				height: var(--slider-height);
				-webkit-appearance: none;
				color: var(--slider-main-color);
				transition: box-shadow 0.2s ease-in-out;
			}
	  
			.slider-container input[type="range"]::-webkit-slider-thumb {
				width: var(--thumb-width);
				height: var(--thumb-height);
				-webkit-appearance: none;
				cursor: ew-resize;
				border-radius: 0;
				transition: box-shadow 0.2s ease-in-out;
				position: relative;
	  
				box-shadow: -3500px 0 0 3500px var(--slider-main-color), inset 0 0 0 25px var(--thumb-color);
	  
				top: var(--thumb-top);
				border-right: var(--thumb-border-right);
				border-left: var(--thumb-border-left);
				border-top: var(--thumb-border-top);
				border-bottom: var(--thumb-border-bottom);
			}
	  
			.slider-container input[type=range]::-moz-range-thumb {
			  width: calc(var(--thumb-width) / 4);
			  height: calc(var(--thumb-height) / 2); 
			  box-shadow: -3500px 10px 0 3500px var(--slider-main-color), inset 0 0 0 25px var(--thumb-color);
			  top: var(--thumb-top);
			  cursor: ew-resize;
			  border-radius: 0;
			  transition: box-shadow 0.2s ease-in-out;
			  position: relative;
			  border-radius: 0;
			  border-right: var(--thumb-border-right);
			  border-left: var(--thumb-border-left);
			  border-top: var(--thumb-border-top);
			  border-bottom: var(--thumb-border-bottom);
			}
	  
			.slider-container input[type="range"]::-webkit-slider-thumb:hover {
				cursor: default;
			}
	  
			.slider-container input[type="range"]:hover {
			  cursor: default;
			}
		`;
	}
}
