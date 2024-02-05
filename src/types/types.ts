/* eslint-disable @typescript-eslint/no-explicit-any */
import { LovelaceCardConfig, LovelaceCard, LovelaceCardEditor } from './lovelace';

import { 
  HassEntity,
    // @ts-ignore
    HassServiceTarget 
} from 'home-assistant-js-websocket';

// import { LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'my-card-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface MyCardConfig extends LovelaceCardConfig {
  type: string;
  entity?: string;
}

export interface MySliderConfig extends MyCardConfig {
  step?: number;
  colorMode?: string;
  coverMode?: string;
  mode?: string;
  vertical?: boolean;
  flipped?: boolean;
  inverse?: boolean;
  intermediate?: boolean;
  disableScroll?: boolean;
  allowTapping?: boolean;
  marginOfError?: number;
  allowSliding?: boolean;
  slideDistance?: number;
  showMin?: boolean;
  minThreshold?: number;
  maxThreshold?: number;
  min?: number;
  max?: number;
  sliderMin?: number;
  sliderId?: string;

  styles?: MySliderStylesConfig;
}

export interface MyButtonConfig extends MyCardConfig {
  icon?: IconConfig;
  label?: string|any;
  buttons?: any;
  stats?: any;
  camera?: string|HassEntity;
  slider?: MySliderConfig;
  styles?: MyButtonStylesConfig;
}


export interface IconConfig extends LovelaceCardConfig {
  icon: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}
export interface LabelConfig extends LovelaceCardConfig {
  text: string;
  extraText: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  styles?: LabelStylesConfig;
}
export interface LabelStylesConfig {
  container?: CssStyleConfig;
  text?: CssStyleConfig;
  extraText?: CssStyleConfig;
}

export interface ButtonsConfig extends LovelaceCardConfig {
  show: boolean;
  vertical: boolean
  buttons: any;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  styles?: ButtonsStylesConfig;
}
export interface ButtonsStylesConfig {
  container?: CssStyleConfig;
  button?: CssStyleConfig;
  text?: CssStyleConfig;
  icon?: CssStyleConfig;
}

export interface ButtonConfig extends LovelaceCardConfig {
  show: boolean;
  text: string;
  icon: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  styles?: ButtonStyleConfig;
}
export interface ButtonStyleConfig {
  container?: CssStyleConfig;
  text?: CssStyleConfig;
  icon?: CssStyleConfig;
}

export interface StatsConfig extends LovelaceCardConfig {
  show: boolean;
  text: string;
  camera: string|HassEntity;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  styles?: StatsStylesConfig;
}
export interface StatsStylesConfig {
  container?: CssStyleConfig;
  camera?: CssStyleConfig;
}

export interface MySliderStylesConfig {
  card?: CssStyleConfig;
  container?: CssStyleConfig;
  track?: CssStyleConfig;
  progress?: CssStyleConfig;
  thumb?: CssStyleConfig;
}
export interface MyButtonStylesConfig {
  card?: CssStyleConfig;
  icon?: CssStyleConfig;
  label?: CssStyleConfig;
  stats?: CssStyleConfig;
  camera?: CssStyleConfig;
  labelContainer?: CssStyleConfig;
  extraText?: CssStyleConfig;
  row1?: CssStyleConfig;
  row2?: CssStyleConfig;
  buttonsContainer?: CssStyleConfig;
  button?: CssStyleConfig;
  buttonText?: CssStyleConfig;
  buttonIcon?: CssStyleConfig;
  sliderCard?: CssStyleConfig;
  sliderContainer?: CssStyleConfig;
  sliderTrack?: CssStyleConfig;
  sliderThumbHor?: CssStyleConfig;
  sliderThumbVer?: CssStyleConfig;
  sliderProgressHor?: CssStyleConfig;
  sliderProgressVer?: CssStyleConfig;
}


export interface CssStyleConfig {
  [key: string]: string;
}

export interface Variables {
  [key: string]: any;
}

export interface ToggleActionConfig extends BaseActionConfig {
  action: 'toggle';
}

export interface CallServiceActionConfig extends BaseActionConfig {
  action: 'call-service';
  service: string;
  target?: HassServiceTarget;
  // "service_data" is kept for backwards compatibility. Replaced by "data".
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
}

export interface NavigateActionConfig extends BaseActionConfig {
  action: 'navigate';
  navigation_path: string;
}

export interface UrlActionConfig extends BaseActionConfig {
  action: 'url';
  url_path: string;
}

export interface MoreInfoActionConfig extends BaseActionConfig {
  action: 'more-info';
}

export interface NoActionConfig extends BaseActionConfig {
  action: 'none';
}

export interface CustomActionConfig extends BaseActionConfig {
  action: 'fire-dom-event';
}

export interface AssistActionConfig extends BaseActionConfig {
  action: 'assist';
  pipeline_id?: string;
  start_listening?: boolean;
}

export interface BaseActionConfig {
  action: string;
  confirmation?: ConfirmationRestrictionConfig;
  repeat?: number;
  repeat_limit?: number;
}

export interface ConfirmationRestrictionConfig {
  text?: string;
  exemptions?: RestrictionConfig[];
}

export interface RestrictionConfig {
  user: string;
}

export type ActionConfig =
  | ToggleActionConfig
  | CallServiceActionConfig
  | NavigateActionConfig
  | UrlActionConfig
  | MoreInfoActionConfig
  | AssistActionConfig
  | NoActionConfig
  | CustomActionConfig;

export type Constructor<T = any> = new (...args: any[]) => T;
