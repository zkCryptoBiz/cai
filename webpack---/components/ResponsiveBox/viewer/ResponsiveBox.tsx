import * as React from 'react';
import classNames from 'clsx';
import {
  formatClassNames,
  getAriaAttributes,
  getDataAttributes,
  getTabIndexAttribute,
} from '@wix/editor-elements-common-utils';
import type {
  IResponsiveBoxProps,
  IContainerImperativeActions,
} from '../../Container/Container.types';
import commonStyles from '../../Container/viewer/shared/common.scss';
import { ARIA_LABEL_DEFAULT } from '../../Container/viewer/shared/constants';
import repeaterSemanticClassNames from '../../Repeater/Repeater.semanticClassNames';
import styles from './ResponsiveBox.scss';

// This container is used in responsive site
const ResponsiveBox: React.ForwardRefRenderFunction<
  IContainerImperativeActions,
  IResponsiveBoxProps
> = (props, ref) => {
  const {
    id,
    className,
    containerRootClassName = '',
    customClassNames = [],
    children,
    role,
    onClick,
    onKeyPress,
    onDblClick,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    hasPlatformClickHandler,
    translations,
    a11y = {},
    ariaAttributes = {},
    tabIndex,
    isRepeaterItem = false,
    observeChildListChange,
    containerProps,
    shouldUseContainerLayoutClass,
  } = props;
  const {
    'aria-label-interactions': ariaLabelInteractions,
    tabindex,
    ...a11yAttr
  } = a11y;

  if (ariaLabelInteractions) {
    a11yAttr['aria-label'] = translations?.ariaLabel || ARIA_LABEL_DEFAULT;
  }

  const rootElementRef = React.useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (onKeyPress) {
      e.key === ' ' && e.preventDefault();
      onKeyPress(e);
    }
  };

  React.useImperativeHandle(ref, () => {
    return {
      focus: () => {
        rootElementRef.current?.focus();
      },
      blur: () => {
        rootElementRef.current?.blur();
      },
    };
  });

  const getRootSemanticClassName = () => {
    if (isRepeaterItem) {
      return repeaterSemanticClassNames.repeaterItem;
    }
    if (props.semanticClassNames) {
      return props.semanticClassNames.root;
    }
    return '';
  };

  React.useEffect(() => {
    if (observeChildListChange && rootElementRef?.current) {
      observeChildListChange(id, rootElementRef.current as HTMLElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      ref={rootElementRef}
      {...a11yAttr}
      {...getAriaAttributes({ ...ariaAttributes, role })}
      {...getTabIndexAttribute({ tabIndex, tabindex })}
      className={classNames(
        styles.root,
        styles.resetDesignAttributes,
        containerRootClassName,
        className,
        {
          [commonStyles.clickable]: hasPlatformClickHandler,
        },
        formatClassNames(getRootSemanticClassName(), ...customClassNames),
      )}
      onDoubleClick={onDblClick}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={classNames(
          styles['css-background'],
          styles.bg,
          formatClassNames(getRootSemanticClassName(), ...customClassNames),
          {
            [containerProps.containerLayoutClassName]:
              shouldUseContainerLayoutClass, // FYI: This doesn't affect the layout, we need this class so the viewer finds it and doesn't throw an error. This workaround fixes this bug: https://jira.wixpress.com/browse/ECL-8908
          },
        )}
      />
      {
        children() // contains: (1) ResponsiveContainer with relative children, (2) DynamicStructureContainer with pinned children
      }
    </div>
  );
};

export default React.forwardRef(ResponsiveBox);
