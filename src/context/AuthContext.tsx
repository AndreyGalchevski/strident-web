import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

import { AUTH_KEY } from "../utils/constants";

export class AuthState {
  isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";

  constructor() {
    makeAutoObservable(this);
  }

  authenticate() {
    this.isAuthenticated = true;
  }

  invalidate() {
    this.isAuthenticated = false;
  }
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={new AuthState()}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
