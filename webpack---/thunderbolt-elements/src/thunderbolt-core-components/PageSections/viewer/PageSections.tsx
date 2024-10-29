import classNames from 'clsx';
import * as React from 'react';
import { getDataAttributes } from '@wix/editor-elements-common-utils';
import type { IPageSectionsProps } from '../PageSections.types';
import styles from './style/PageSections.scss';

const PageSections: React.FC<IPageSectionsProps> = props => {
  const { id, children, className } = props;
  return (
    <main
      id={id}
      {...getDataAttributes(props)}
      className={classNames(className, styles.pageSections)}
      data-main-content-parent={true}
    >
      {children()}
    </main>
  );
};

export default PageSections;
