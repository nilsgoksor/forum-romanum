import { AlertColor } from "@mui/material";
export type StateI = {
  isLoggedIn: boolean;
  user: string;
};

export enum Types {
  SetIsLoggedIn = "SET_IS_LOGGED_IN",
  SetUser = "SET_USER",
  SetUserMessage = "SET_USER_MESSAGE",
}

export type ActionPayload = {
  [Types.SetIsLoggedIn]: {
    status: boolean;
  };
  [Types.SetUser]: {
    user: string;
  };
  [Types.SetUserMessage]: {
    message: string;
    type: AlertColor;
  };
};
