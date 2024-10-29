import type { SkinDefinition } from '@wix/editor-elements-panel/src/adapters/types';
import { cssPropertyToDefaultValueMap } from '@wix/editor-elements-panel';
import {
  backgroundDefaultValue,
  fontDefaultValue,
  hover,
  regular,
  selected,
} from './common';

export const commonItemSkinParamsUDP: SkinDefinition = {
  'item-background': {
    type: 'BACKGROUND_FILL',
    defaultValue: backgroundDefaultValue,
    state: regular,
  },
  'item-hover-background': {
    type: 'BACKGROUND_FILL',
    state: hover,
  },
  'item-selected-background': {
    type: 'BACKGROUND_FILL',
    state: selected,
  },
  'item-font': {
    type: 'FONT',
    defaultValue: fontDefaultValue,
    state: regular,
  },
  'item-color': {
    type: 'CSS_COLOR',
    defaultValue: cssPropertyToDefaultValueMap.color,
    state: regular,
  },
  'item-hover-color': {
    type: 'CSS_COLOR',
    state: hover,
  },
  'item-selected-color': {
    type: 'CSS_COLOR',
    state: selected,
  },
  'item-text-decoration': {
    type: 'CSSString',
    defaultValue: cssPropertyToDefaultValueMap['text-decoration-line'],
    state: regular,
  },
  'item-hover-text-decoration': {
    type: 'CSSString',
    state: hover,
  },
  'item-selected-text-decoration': {
    type: 'CSSString',
    state: selected,
  },
  'item-text-transform': {
    type: 'CSSString',
    defaultValue: cssPropertyToDefaultValueMap['text-transform'],
    state: regular,
  },
  'item-text-outline': {
    type: 'CSSString',
    defaultValue:
      '1px 0px transparent, -1px 0px transparent, 0px 1px transparent, 0px -1px transparent',
    state: regular,
  },
  'item-hover-text-outline': {
    type: 'CSSString',
    state: hover,
  },
  'item-selected-text-outline': {
    type: 'CSSString',
    state: selected,
  },
  'item-text-highlight': {
    type: 'CSS_COLOR',
    defaultValue: 'none',
    state: regular,
  },
  'item-hover-text-highlight': {
    type: 'CSS_COLOR',
    state: hover,
  },
  'item-selected-text-highlight': {
    type: 'CSS_COLOR',
    state: selected,
  },
  'item-letter-spacing': {
    type: 'SIZE',
    defaultValue: cssPropertyToDefaultValueMap['letter-spacing'],
    state: regular,
  },
  'item-line-height': {
    type: 'SIZE',
    defaultValue: cssPropertyToDefaultValueMap['line-height'],
    state: regular,
  },
  'item-text-shadow': {
    type: 'TEXT_SHADOW',
    defaultValue: '0px 0px transparent',
    state: regular,
  },
  'item-hover-text-shadow': {
    type: 'TEXT_SHADOW',
    state: hover,
  },
  'item-selected-text-shadow': {
    type: 'TEXT_SHADOW',
    state: selected,
  },
  'item-border-left': {
    type: 'BORDER_SIDE',
    defaultValue: cssPropertyToDefaultValueMap['border-left'],
    state: regular,
  },
  'item-hover-border-left': {
    type: 'BORDER_SIDE',
    state: hover,
  },
  'item-selected-border-left': {
    type: 'BORDER_SIDE',
    state: selected,
  },
  'item-border-right': {
    type: 'BORDER_SIDE',
    defaultValue: cssPropertyToDefaultValueMap['border-right'],
    state: regular,
  },
  'item-hover-border-right': {
    type: 'BORDER_SIDE',
    state: hover,
  },
  'item-selected-border-right': {
    type: 'BORDER_SIDE',
    state: selected,
  },
  'item-border-top': {
    type: 'BORDER_SIDE',
    defaultValue: cssPropertyToDefaultValueMap['border-top'],
    state: regular,
  },
  'item-hover-border-top': {
    type: 'BORDER_SIDE',
    state: hover,
  },
  'item-selected-border-top': {
    type: 'BORDER_SIDE',
    state: selected,
  },
  'item-border-bottom': {
    type: 'BORDER_SIDE',
    defaultValue: cssPropertyToDefaultValueMap['border-bottom'],
    state: regular,
  },
  'item-hover-border-bottom': {
    type: 'BORDER_SIDE',
    state: hover,
  },
  'item-selected-border-bottom': {
    type: 'BORDER_SIDE',
    state: selected,
  },
  'item-border-radius': {
    type: 'SIDES',
    defaultValue: cssPropertyToDefaultValueMap['border-radius'],
    state: regular,
  },
  'item-hover-border-radius': {
    type: 'SIDES',
    state: hover,
  },
  'item-selected-border-radius': {
    type: 'SIDES',
    state: selected,
  },
  'item-box-shadow': {
    type: 'BOX_SHADOW',
    defaultValue: cssPropertyToDefaultValueMap['box-shadow'],
    state: regular,
  },
  'item-hover-box-shadow': {
    type: 'BOX_SHADOW',
    state: hover,
  },
  'item-selected-box-shadow': {
    type: 'BOX_SHADOW',
    state: selected,
  },
};

export const ownItemSkinParamsUDP: SkinDefinition = {
  'horizontal-item-icon-display': {
    type: 'CSSString',
    defaultValue: 'initial',
    state: regular,
  },
  'item-icon-size': {
    type: 'SIZE',
    defaultValue: '10px',
    state: regular,
  },
  'item-hover-icon-size': {
    type: 'SIZE',
    state: hover,
  },
  'item-icon-color': {
    type: 'CSS_COLOR',
    defaultValue: cssPropertyToDefaultValueMap.color,
    state: regular,
  },
  'item-hover-icon-color': {
    type: 'CSS_COLOR',
    state: hover,
  },
  'item-divider': {
    type: 'BORDER_SIDE',
    defaultValue: '1px solid rgba(0,0,0,1)',
    state: regular,
  },
  'item-text-align': {
    type: 'TEXT_ALIGNMENT',
    defaultValue: 'center',
    state: regular,
  },
  'item-direction': {
    type: 'CSSString',
    defaultValue: 'ltr',
    state: regular,
  },
};

export const commonItemSkinParamsLayoutPanel: SkinDefinition = {
  'item-vertical-padding': {
    type: 'SIZE',
    defaultValue: '0px',
    state: regular,
  },
  'item-horizontal-padding': {
    type: 'SIZE',
    defaultValue: '0px',
    state: regular,
  },
};

export const itemSkinParams: SkinDefinition = {
  ...commonItemSkinParamsUDP,
  ...ownItemSkinParamsUDP,
  ...commonItemSkinParamsLayoutPanel,
};
