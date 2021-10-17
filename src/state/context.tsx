import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { AppReducer, StateI } from ".";
import { MessageType } from "../components/UserMessage";

export const initialState: StateI = {
  isLoggedIn: false,
  user: "",
  userMessage: { message: "", type: MessageType.SUCCESS },
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
export { AppContext, AppProvider };
