import * as React from 'react';
import { ISectionProps } from '../../Section/Section.types';
import Section from '../../Section/viewer/Section';
import semanticClassNames from '../FooterSection.semanticClassNames';

const FooterSection: React.FC<ISectionProps> = props => {
  return <Section {...props} semanticClassNames={semanticClassNames} />;
};

export default FooterSection;
