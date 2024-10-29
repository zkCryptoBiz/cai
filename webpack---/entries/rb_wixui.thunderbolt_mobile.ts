import ExpandableMenuComponent from '../components/ExpandableMenu/viewer/ExpandableMenu';
import ExpandableMenuController from '../components/ExpandableMenu/viewer/ExpandableMenu.controller';
import MenuContainerComponent from '../components/MenuContainer/viewer/MenuContainer';
import MenuContainerController from '../components/MenuContainer/viewer/MenuContainer.controller';
import MenuToggleComponent from '../components/MenuToggle/viewer/MenuToggle';
import MenuToggleController from '../components/MenuToggle/viewer/MenuToggle.controller';
import BackToTopButtonComponent from '@wix/thunderbolt-elements/src/components/BackToTopButton/viewer/BackToTopButton';
import BackToTopButtonController from '@wix/thunderbolt-elements/src/components/BackToTopButton/viewer/BackToTopButton.controller';


const ExpandableMenu = {
  component: ExpandableMenuComponent,
  controller: ExpandableMenuController
};

const MenuContainer = {
  component: MenuContainerComponent,
  controller: MenuContainerController
};

const MenuToggle = {
  component: MenuToggleComponent,
  controller: MenuToggleController
};

const BackToTopButton = {
  component: BackToTopButtonComponent,
  controller: BackToTopButtonController
};


export const components = {
  ['ExpandableMenu']: ExpandableMenu,
  ['MenuContainer']: MenuContainer,
  ['MenuToggle']: MenuToggle,
  ['BackToTopButton']: BackToTopButton
};

