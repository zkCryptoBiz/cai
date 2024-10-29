import type { RefObject } from 'react';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { PREVIEW_STATE } from './HamburgerMenuRoot/viewer/constants';

export type IHamburgerMenuContextValue = {
  isMenuOpen: boolean | undefined;
  isMenuContainerFullscreen: boolean;
  setIsMenuContainerFullscreen: (state: boolean) => void;
  shouldFocus: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  menuContainerRef: RefObject<HTMLDivElement> | undefined;
};

type IHamburgerMenuContextProviderProps = {
  setIsMenuOpen: (state: boolean) => void;
  isMenuOpen: boolean | undefined;
  compPreviewState: string | null;
  shouldFocus: boolean;
  children: React.ReactNode | Array<React.ReactNode>;
};

export const HamburgerMenuContext = createContext<IHamburgerMenuContextValue>({
  isMenuOpen: undefined,
  isMenuContainerFullscreen: false,
  shouldFocus: true,
  setIsMenuOpen: () => {},
  setIsMenuContainerFullscreen: () => {},
  menuContainerRef: undefined,
});

export const useHamburgerMenuContext = () => useContext(HamburgerMenuContext);

export const HamburgerMenuContextProvider: React.FC<
  IHamburgerMenuContextProviderProps
> = ({
  children,
  compPreviewState,
  shouldFocus,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const [isMenuContainerFullscreen, setIsMenuContainerFullscreen] =
    useState(false);

  useEffect(() => {
    if (compPreviewState === PREVIEW_STATE.SHOW_OVERLAY) {
      setIsMenuOpen(true);
    } else if (compPreviewState === PREVIEW_STATE.HIDE_OVERLAY) {
      setIsMenuOpen(false);
    }
  }, [compPreviewState, setIsMenuOpen]);

  const contextValue = useMemo(
    () => ({
      isMenuOpen,
      setIsMenuOpen,
      isMenuContainerFullscreen,
      setIsMenuContainerFullscreen,
      shouldFocus,
      menuContainerRef,
    }),
    [
      isMenuOpen,
      setIsMenuOpen,
      isMenuContainerFullscreen,
      setIsMenuContainerFullscreen,
      shouldFocus,
      menuContainerRef,
    ],
  );

  return (
    <HamburgerMenuContext.Provider value={contextValue}>
      {children}
    </HamburgerMenuContext.Provider>
  );
};
