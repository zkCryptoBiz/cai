import HamburgerCloseButtonComponent from '../components/HamburgerMenu/HamburgerCloseButton/viewer/HamburgerCloseButton';
import HamburgerCloseButtonController from '../components/HamburgerMenu/HamburgerCloseButton/viewer/HamburgerCloseButton.controller';
import HamburgerMenuContainerComponent from '../components/HamburgerMenu/HamburgerMenuContainer/viewer/HamburgerMenuContainer';
import HamburgerMenuContainerController from '../.components/HamburgerMenu/HamburgerMenuContainer/viewer/HamburgerMenuContainer.controller';
import HamburgerMenuRootComponent from '../components/HamburgerMenu/HamburgerMenuRoot/viewer/HamburgerMenuRoot';
import HamburgerMenuRootController from '../.components/HamburgerMenu/HamburgerMenuRoot/viewer/HamburgerMenuRoot.controller';
import HamburgerOpenButtonComponent from '../components/HamburgerMenu/HamburgerOpenButton/viewer/HamburgerOpenButton';
import HamburgerOpenButtonController from '../components/HamburgerMenu/HamburgerOpenButton/viewer/HamburgerOpenButton.controller';
import HamburgerOverlayComponent from '../components/HamburgerMenu/HamburgerOverlay/viewer/HamburgerOverlay';
import HamburgerOverlayController from '../components/HamburgerMenu/HamburgerOverlay/viewer/HamburgerOverlay.controller';


const HamburgerCloseButton = {
  component: HamburgerCloseButtonComponent,
  controller: HamburgerCloseButtonController
};

const HamburgerMenuContainer = {
  component: HamburgerMenuContainerComponent,
  controller: HamburgerMenuContainerController
};

const HamburgerMenuRoot = {
  component: HamburgerMenuRootComponent,
  controller: HamburgerMenuRootController
};

const HamburgerOpenButton = {
  component: HamburgerOpenButtonComponent,
  controller: HamburgerOpenButtonController
};

const HamburgerOverlay = {
  component: HamburgerOverlayComponent,
  controller: HamburgerOverlayController
};


export const components = {
  ['HamburgerCloseButton']: HamburgerCloseButton,
  ['HamburgerMenuContainer']: HamburgerMenuContainer,
  ['HamburgerMenuRoot']: HamburgerMenuRoot,
  ['HamburgerOpenButton']: HamburgerOpenButton,
  ['HamburgerOverlay']: HamburgerOverlay
};

