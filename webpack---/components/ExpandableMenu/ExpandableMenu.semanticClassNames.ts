import verticalMenuSemanticClassNames from '../VerticalMenu/VerticalMenu.semanticClassNames';
// ExpandableMenu is used on EDX as VerticalMenu on Classic, and also as the inner menu in mobile on both editors.

const semanticClassNames = {
  ...verticalMenuSemanticClassNames,
  arrow: 'vertical-menu__arrow',
} as const;

export default semanticClassNames;
