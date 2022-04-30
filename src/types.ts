import { ActionConfig, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'my-footer-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface MySliderCardConfig extends LovelaceCardConfig {
  type: string;
  entity: string;
}

// TODO Add your configuration elements here for type-checking
export interface MyFooterCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;
  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  entity?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface MyDashboardCardConfig extends LovelaceCardConfig {
    entity: string;
}