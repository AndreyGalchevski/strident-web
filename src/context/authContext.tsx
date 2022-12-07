import {
  createContext,
  useContext,
  FunctionComponent,
  useReducer,
  PropsWithChildren,
} from "react";

import { initialState, reducer } from "./authReducer";

const AuthContext = createContext({});

export function useAuthContext(): any {
  return useContext(AuthContext);
}

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};
