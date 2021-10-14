import { ActionPayload, StateI, Types } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};
export type ActionI = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];

export const AppReducer = (state: StateI, action: ActionI) => {
  switch (action.type) {
    case Types.SetIsLoggedIn:
      return {
        ...state,
        isLoggedIn: action.payload.status,
      };
    case Types.SetAuthor:
      return {
        ...state,
        author: action.payload.author,
      };
    default:
      return state;
  }
};
