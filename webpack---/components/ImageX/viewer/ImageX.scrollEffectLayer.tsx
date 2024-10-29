import React from 'react';
import { replaceCompIdPlaceholder } from '@wix/editor-elements-common-utils';
import { TestIds } from '../constants';

export const ScrollEffectLayer: React.FC<{
  containerId: string;
  pageId: string;
  children: React.ReactNode;
  scrollEffectStyles: string;
  id: string;
  className?: string;
}> = ({ containerId, pageId, children, scrollEffectStyles, id, className }) => (
  <>
    <style data-testid={TestIds.scrollEffectStyle}>
      {scrollEffectStyles && replaceCompIdPlaceholder(scrollEffectStyles, id)}
    </style>
    <wix-bg-media
      data-page-id={pageId}
      data-container-id={containerId}
      data-use-css-vars="true"
      class={className}
    >
      {children}
    </wix-bg-media>
  </>
);
