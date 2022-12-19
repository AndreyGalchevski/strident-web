import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

export const AUTH_KEY = "isAuthenticated";

export class SideMenuState {
  isOpen = false;

  constructor() {
    makeAutoObservable(this);
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

const SideMenuContext = createContext<SideMenuState | undefined>(undefined);

export const SideMenuProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <SideMenuContext.Provider value={new SideMenuState()}>
      {children}
    </SideMenuContext.Provider>
  );
};

export default SideMenuContext;
