import { makeAutoObservable } from "mobx";
import { createContext, FunctionComponent, PropsWithChildren } from "react";

export class AuthState {
  isAuthenticated = !!localStorage.getItem("stridentToken");

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
