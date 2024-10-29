import * as React from 'react';
import classNames from 'clsx';
import type {
  CellsMapType,
  IdIndexMapType,
} from '@wix/thunderbolt-commons/dist/repeater';
import {
  supportedKeyboardKeys,
  getRepeaterCells,
  getNextCell,
} from '@wix/thunderbolt-commons/dist/repeater';
import {
  formatClassNames,
  getDataAttributes,
} from '@wix/editor-elements-common-utils';
import ResponsiveContainer from '@wix/thunderbolt-elements/src/thunderbolt-core-components/ResponsiveContainer/viewer/ResponsiveContainer';
import repeaterSemanticClassNames from '../Repeater.semanticClassNames';
import type { IResponsiveRepeaterSkinProps } from '../ResponsiveRepeater.types';

const ResponsiveRepeater: React.FC<IResponsiveRepeaterSkinProps> = props => {
  const {
    id,
    responsiveContainerProps,
    keyboardNavigationEnabled,
    items,
    children,
    classes,
    className,
    customClassNames = [],
    ariaAttributes,
    observeChildListChange,
    useCustomElement,
  } = props;

  const responsiveContainerChildren = React.useCallback(
    () =>
      items.map((itemId, index) => (
        <React.Fragment key={itemId}>
          {children({
            parentType: 'Repeater',
            scopeId: itemId,
            itemIndex: index,
          })}
        </React.Fragment>
      )),
    [children, items],
  );

  const repeaterRef = React.useRef<HTMLDivElement>(null);
  const itemsWrapperRef = React.useRef<HTMLDivElement>(null);
  const [rootWidth, setRootWidth] = React.useState<number>(0);
  const [cellsRefs, setCellsRefs] = React.useState<CellsMapType>([]);
  const [indexMap, setIndexMap] = React.useState<IdIndexMapType>({});

  React.useLayoutEffect(() => {
    if (repeaterRef.current && keyboardNavigationEnabled) {
      setRootWidth(repeaterRef.current.offsetWidth);
      const { cellsMap, idIndexMap } = getRepeaterCells(
        items,
        repeaterRef.current,
      );
      cellsMap.forEach((row, rowIndex) =>
        row.forEach((cell, columnIndex) => {
          cell.setAttribute(
            'tabindex',
            rowIndex === 0 && columnIndex === 0 ? '0' : '-1',
          );
        }),
      );
      setCellsRefs(cellsMap);
      setIndexMap(idIndexMap);
    }
  }, [keyboardNavigationEnabled, items]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!keyboardNavigationEnabled || !repeaterRef.current) {
      return;
    }

    const target = event.target as Element;
    let cellsMap = cellsRefs;
    let idIndexMap = indexMap;

    const shouldHandleKeyboardEvent =
      supportedKeyboardKeys.includes(event.key) &&
      target.tagName !== 'INPUT' &&
      target.tagName !== 'SELECT';

    if (!shouldHandleKeyboardEvent || !idIndexMap[target.id]) {
      return;
    }

    event.preventDefault();

    if (repeaterRef.current.offsetWidth !== rootWidth) {
      const repeaterCells = getRepeaterCells(items, repeaterRef.current);
      cellsMap = repeaterCells.cellsMap;
      idIndexMap = repeaterCells.idIndexMap;
      setCellsRefs(repeaterCells.cellsMap);
      setIndexMap(repeaterCells.idIndexMap);
      setRootWidth(repeaterRef.current.offsetWidth);
    }

    const cellRef: HTMLElement | undefined = getNextCell(
      cellsMap,
      idIndexMap,
      target.id,
      event.key,
    );

    cellRef?.focus();
  };

  React.useEffect(() => {
    const elementRef = responsiveContainerProps.shouldOmitWrapperLayers
      ? repeaterRef
      : itemsWrapperRef;
    if (observeChildListChange && elementRef?.current) {
      observeChildListChange(id, elementRef.current as HTMLElement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={id}
      {...getDataAttributes(props)}
      className={classNames(
        classes.bg,
        className,
        formatClassNames(repeaterSemanticClassNames.root, ...customClassNames),
      )}
      ref={repeaterRef}
      onKeyDown={handleKeyDown}
    >
      <ResponsiveContainer
        ref={itemsWrapperRef}
        {...responsiveContainerProps}
        ariaAttributes={ariaAttributes}
        tagName={useCustomElement ? 'multi-column-layouter' : 'div'}
      >
        {responsiveContainerChildren}
      </ResponsiveContainer>
    </div>
  );
};

export default ResponsiveRepeater;
