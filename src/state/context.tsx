import React, { createContext, useReducer, ReactNode } from "react";
import { AppReducer, StateI } from ".";

export const initialState: StateI = {
  isLoggedIn: false,
  author: "",
};

const AppContext = createContext<{
  state: StateI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface AppProviderI {
  children?: ReactNode;
}

const AppProvider: React.FC = ({ children }: AppProviderI) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export { AppContext, AppProvider };
