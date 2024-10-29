import HamburgerMenuContentComponent from '../components/HamburgerMenu/HamburgerMenuContent/viewer/HamburgerMenuContent';
import MegaMenuContainerItem_ClassicComponent from '../components/MegaMenuContainerItem/viewer/skinComps/Classic/Classic.skin';
import MegaMenuContainerItem_ResponsiveComponent from '../components/MegaMenuContainerItem/viewer/skinComps/Responsive/Responsive.skin';
import MenuComponent from '../components/Menu/viewer/Menu';
import MenuController from '../components/Menu/viewer/Menu.controller';
import StylableHorizontalMenu_DefaultComponent from '../components/StylableHorizontalMenu/viewer/skinComps/Default/Default.skin';
import StylableHorizontalMenu_DefaultController from '../components/StylableHorizontalMenu/viewer/StylableHorizontalMenu.controller';
import StylableHorizontalMenu_ScrollColumnComponent from '../components/StylableHorizontalMenu/viewer/skinComps/ScrollColumn/ScrollColumn.skin';
import StylableHorizontalMenu_ScrollFlyoutComponent from '../components/StylableHorizontalMenu/viewer/skinComps/ScrollFlyout/ScrollFlyout.skin';
import StylableHorizontalMenu_ScrollFlyoutAndColumnComponent from '../components/StylableHorizontalMenu/viewer/skinComps/ScrollFlyoutAndColumn/ScrollFlyoutAndColumn.skin';
import StylableHorizontalMenu_WrapColumnComponent from '../components/StylableHorizontalMenu/viewer/skinComps/WrapColumn/WrapColumn.skin';
import StylableHorizontalMenu_WrapFlyoutComponent from '../components/StylableHorizontalMenu/viewer/skinComps/WrapFlyout/WrapFlyout.skin';
import StylableHorizontalMenu_WrapFlyoutAndColumnComponent from '../components/StylableHorizontalMenu/viewer/skinComps/WrapFlyoutAndColumn/WrapFlyoutAndColumn.skin';
import StylableHorizontalMenuComponent from '../components/StylableHorizontalMenu/viewer/StylableHorizontalMenu';
import SubmenuComponent from '../components/Submenu/viewer/Submenu';


const HamburgerMenuContent = {
  component: HamburgerMenuContentComponent
};

const MegaMenuContainerItem_Classic = {
  component: MegaMenuContainerItem_ClassicComponent
};

const MegaMenuContainerItem_Responsive = {
  component: MegaMenuContainerItem_ResponsiveComponent
};

const Menu = {
  component: MenuComponent,
  controller: MenuController
};

const StylableHorizontalMenu_Default = {
  component: StylableHorizontalMenu_DefaultComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_ScrollColumn = {
  component: StylableHorizontalMenu_ScrollColumnComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_ScrollFlyout = {
  component: StylableHorizontalMenu_ScrollFlyoutComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_ScrollFlyoutAndColumn = {
  component: StylableHorizontalMenu_ScrollFlyoutAndColumnComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_WrapColumn = {
  component: StylableHorizontalMenu_WrapColumnComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_WrapFlyout = {
  component: StylableHorizontalMenu_WrapFlyoutComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu_WrapFlyoutAndColumn = {
  component: StylableHorizontalMenu_WrapFlyoutAndColumnComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const StylableHorizontalMenu = {
  component: StylableHorizontalMenuComponent,
  controller: StylableHorizontalMenu_DefaultController
};

const Submenu = {
  component: SubmenuComponent
};


export const components = {
  ['HamburgerMenuContent']: HamburgerMenuContent,
  ['MegaMenuContainerItem_Classic']: MegaMenuContainerItem_Classic,
  ['MegaMenuContainerItem_Responsive']: MegaMenuContainerItem_Responsive,
  ['Menu']: Menu,
  ['StylableHorizontalMenu_Default']: StylableHorizontalMenu_Default,
  ['StylableHorizontalMenu_ScrollColumn']: StylableHorizontalMenu_ScrollColumn,
  ['StylableHorizontalMenu_ScrollFlyout']: StylableHorizontalMenu_ScrollFlyout,
  ['StylableHorizontalMenu_ScrollFlyoutAndColumn']: StylableHorizontalMenu_ScrollFlyoutAndColumn,
  ['StylableHorizontalMenu_WrapColumn']: StylableHorizontalMenu_WrapColumn,
  ['StylableHorizontalMenu_WrapFlyout']: StylableHorizontalMenu_WrapFlyout,
  ['StylableHorizontalMenu_WrapFlyoutAndColumn']: StylableHorizontalMenu_WrapFlyoutAndColumn,
  ['StylableHorizontalMenu']: StylableHorizontalMenu,
  ['Submenu']: Submenu
};

