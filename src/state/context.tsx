import { createContext } from "react";
import { StateI } from ".";
import { MessageType } from "../components/UserMessage";

export const initialState: StateI = {
  isLoggedIn: false,
  user: "",
  userMessage: { message: "", type: MessageType.SUCCESS },
  posts: [],
};

export const AppContext = createContext<{
  state: StateI;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});
