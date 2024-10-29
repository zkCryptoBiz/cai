import type { ViewportDimensionsHeuristics } from './ImageX.types';

export const TestIds = {
  root: 'imageX',
  scrollEffectStyle: 'scrollEffectStyle',
  displayModeStyle: 'displayModeStyle',
  pictureElement: 'pictureElement',
};

export const COMP_SELECTOR_PLACEHOLDER = '#<%= compId %>';

export const VIEWPORT_DIMENSIONS_HEURISTICS: Array<ViewportDimensionsHeuristics> =
  [
    // desktop
    {
      viewportWidthRange: [1920, 1536],
      viewportHeight: 1080,
    },
    {
      viewportWidthRange: [1536, 1440],
      viewportHeight: 864,
    },
    {
      viewportWidthRange: [1440, 1366],
      viewportHeight: 900,
    },
    {
      viewportWidthRange: [1366, 1280],
      viewportHeight: 768,
    },
    {
      viewportWidthRange: [1280, 1000],
      viewportHeight: 720,
    },
    // tablet
    {
      viewportWidthRange: [1000, 750],
      viewportHeight: 1024,
    },
    // mobile
    {
      viewportWidthRange: [750, 350],
      viewportHeight: 800,
    },
  ];
