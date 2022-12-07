import * as types from './authActionTypes';

export const initialState = {
  isAuthenticated: !!localStorage.getItem('stridentToken'),
};

export interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthAction {
  type: string;
  payload: string;
}

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      localStorage.setItem('stridentToken', action.payload);
      return {
        ...state,
        isAuthenticated: true,
      };
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem('stridentToken');
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
