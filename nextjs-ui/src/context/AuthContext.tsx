import React, { ReactNode, createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';

export type User = {
  name?: string;
};

export interface State {
  loading: boolean;
  user: User;
  login: (name: string) => void;
  logout: () => void;
}

const initialState: State = {
  loading: true,
  user: {},
  login: () => null,
  logout: () => null,
};

const LOCAL_STORAGE_KEY = 'authState';

export const Context = createContext<State>(initialState);

export const useAuthContext = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('AuthContextProvider not properly set up');
  }
  return context;
};

const reducer = (state: State, action: Partial<State>): State => ({
  ...state,
  ...action,
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = useCallback((name: string) => {
    dispatch({ user: { name } });
  }, []);

  const logout = useCallback(() => {
    dispatch({ user: initialState.user });
  }, []);

  useEffect(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedState: User = storedState ? JSON.parse(storedState) : initialState.user;
    if (storedState && parsedState.name) {
      dispatch({ user: parsedState, loading: false });
    } else {
      dispatch({ loading: false });
    }
  }, []);

  useEffect(() => {
    if (state.loading) {
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.user));
  }, [state.user, state.loading]);

  const contextValue = useMemo(() => ({ ...state, login, logout }), [state, login, logout]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
