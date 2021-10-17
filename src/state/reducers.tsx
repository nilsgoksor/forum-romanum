import { MessageType } from "../components/UserMessage";
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
    case Types.SetUser:
      return {
        ...state,
        user: action.payload.user,
      };
    case Types.SetPosts:
      return { ...state, posts: action.payload.posts };
    case Types.CreatePost:
      return {
        ...state,
        posts: [...state.posts, action.payload.createdPost],
        userMessage: { message: "Post created", type: MessageType.SUCCESS },
      };
    case Types.SavePost:
      const modifiedPosts = [...state.posts];
      const saveIndex = modifiedPosts.findIndex(
        (p) => p.id === action.payload.savedPost.id
      );
      if (saveIndex !== -1) {
        modifiedPosts.splice(saveIndex, 1, action.payload.savedPost);
        return {
          ...state,
          posts: modifiedPosts,
          userMessage: { message: "Post saved", type: MessageType.SUCCESS },
        };
      }
      return state;
    case Types.DeletePost:
      const updatedPosts = [...state.posts];
      const removeIndex = updatedPosts.findIndex(
        (p) => p.id === action.payload.id
      );
      if (removeIndex !== -1) {
        updatedPosts.splice(removeIndex, 1);
        return {
          ...state,
          posts: updatedPosts,
          userMessage: { message: "Post deleted", type: MessageType.SUCCESS },
        };
      }
      return state;
    case Types.SetUserMessage:
      return {
        ...state,
        userMessage: {
          message: action.payload.message,
          type: action.payload.type,
        },
      };
    default:
      return state;
  }
};
