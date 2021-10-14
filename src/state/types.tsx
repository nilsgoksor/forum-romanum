export type StateI = {
  isLoggedIn: boolean;
  user: string;
};

export enum Types {
  SetIsLoggedIn = "SET_IS_LOGGED_IN",
  SetUser = "SET_USER",
}

export type ActionPayload = {
  [Types.SetIsLoggedIn]: {
    status: boolean;
  };
  [Types.SetUser]: {
    user: string;
  };
};
