import * as React from 'react';
import { BackgroundXProps } from '../BackgroundX.types';
import FillLayers from '../../FillLayers/viewer/FillLayers';

const BackgroundX: React.FC<BackgroundXProps> = props => (
  <FillLayers {...props} />
);

export default BackgroundX;
