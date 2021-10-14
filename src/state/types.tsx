export type StateI = {
  isLoggedIn: boolean;
  author: string;
};

export enum Types {
  SetIsLoggedIn = "SET_IS_LOGGED_IN",
  SetAuthor = "SET_AUTHOR",
}

export type ActionPayload = {
  [Types.SetIsLoggedIn]: {
    status: boolean;
  };
  [Types.SetAuthor]: {
    author: string;
  };
};
