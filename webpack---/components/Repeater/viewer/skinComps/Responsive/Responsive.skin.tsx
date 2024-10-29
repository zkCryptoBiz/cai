import * as React from 'react';
import ResponsiveRepeater from '../../ResponsiveRepeater';
import type { IResponsiveRepeaterProps } from '../../../ResponsiveRepeater.types';
import styles from './Responsive.scss';

const ResponsiveSkin: React.FC<IResponsiveRepeaterProps> = props => {
  return <ResponsiveRepeater {...props} classes={styles} />;
};

export default ResponsiveSkin;
