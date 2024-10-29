import * as React from 'react';
import type { IVectorImageProps } from '../../../VectorImage.types';
import VectorImageBase from '../../VectorImageBase';

const VectorButton: React.FC<IVectorImageProps> = props => {
  return <VectorImageBase {...props} tag="button" />;
};

export default VectorButton;
