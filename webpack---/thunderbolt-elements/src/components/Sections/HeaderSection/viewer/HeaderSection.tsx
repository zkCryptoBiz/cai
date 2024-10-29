import * as React from 'react';
import classNames from 'clsx';
import Section from '../../Section/viewer/Section';
import {
  useScrollPosition,
  Pos,
} from '../../../../providers/useScrollPosition';
import { IHeaderSectionProps } from '../HeaderSection.types';
import styles from '../../Section/viewer/styles/Section.scss';
import semanticClassNames from '../HeaderSection.semanticClassNames';

const SCROLLED_Y = 2;

const SCROLL_UP_THRESHOLD = 100;

const getDownThreshold = (animationType: IHeaderSectionProps['animate']) => {
  switch (animationType) {
    case 'move':
      return 400;
    case 'fade':
      return 200;
    default:
      return 200;
  }
};

const createAnimationScrollListener = (
  animationType: IHeaderSectionProps['animate'],
  setAnimationClass: Function,
) => {
  let dirChangeStart = 0;
  let scrollState: 'UP' | 'DOWN' = 'DOWN';
  const listener = ({ prevPos, currPos }: { prevPos: Pos; currPos: Pos }) => {
    const currScroll = currPos.y * -1;
    const prevScroll = prevPos.y * -1;
    if (currScroll >= prevScroll) {
      if (scrollState === 'UP') {
        dirChangeStart = prevScroll;
        scrollState = 'DOWN';
      }
      if (currScroll - dirChangeStart > getDownThreshold(animationType)) {
        setAnimationClass('scrolled-down');
      }
    } else {
      if (scrollState === 'DOWN') {
        dirChangeStart = prevScroll;
        scrollState = 'UP';
      }
      if (
        dirChangeStart - currScroll > SCROLL_UP_THRESHOLD ||
        currScroll <= 10
      ) {
        setAnimationClass('scrolled-up');
      }
    }
  };
  return listener;
};

const HeaderSection: React.FC<IHeaderSectionProps> = props => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);

  // bg color change listener
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y * -1 >= SCROLLED_Y) {
        if (!scrolled) {
          setScrolled(true);
        }
      } else if (scrolled) {
        setScrolled(false);
      }
    },
    [scrolled],
    { disabled: props.skin !== 'RectangleAreaAfterScroll' },
  );

  const [animationState, setAnimationClass] = React.useState<
    'scrolled-down' | 'scrolled-up' | ''
  >('');

  // animation listener
  useScrollPosition(
    createAnimationScrollListener(props.animate, setAnimationClass),
    [],
    {
      waitFor: 45,
      disabled: props.animate === 'none',
    },
  );

  return (
    <Section
      {...props}
      semanticClassNames={semanticClassNames}
      className={classNames(props.className, {
        [styles[props.skin]]: true,
        [styles.scrolled]: scrolled,
        [styles.animate]: props.animate !== 'none',
        [styles.move]:
          animationState === 'scrolled-down' && props.animate === 'move',
        [styles.fade]:
          animationState === 'scrolled-down' && props.animate === 'fade',
        [styles.scrollUp]: animationState === 'scrolled-up',
      })}
    />
  );
};

export default HeaderSection;
