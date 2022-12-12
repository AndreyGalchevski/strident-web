import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

export const AUTH_KEY = "isAuthenticated";

export class AuthState {
  isAuthenticated = localStorage.getItem(AUTH_KEY) === "true";

  constructor() {
    makeAutoObservable(this);
  }

  authenticate() {
    localStorage.setItem(AUTH_KEY, "true");
    this.isAuthenticated = true;
  }

  invalidate() {
    localStorage.removeItem(AUTH_KEY);
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
