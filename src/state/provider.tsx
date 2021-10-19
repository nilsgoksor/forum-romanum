import { useReducer, ReactNode, useEffect } from "react";
import { AppReducer, StateI } from ".";
import { AppContext } from "./context";

interface AppProviderI {
  children?: ReactNode;
  initialState: StateI;
}

export const AppProvider = ({ children, initialState }: AppProviderI) => {
  const localState = JSON.parse(localStorage.getItem("forum-romanum") || "{}");
  const reducerState =
    Object.keys(localState).length > 0 ? localState : initialState;

  const [state, dispatch] = useReducer(AppReducer, reducerState);

  useEffect(() => {
    localStorage.setItem("forum-romanum", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
