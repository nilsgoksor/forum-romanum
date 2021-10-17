import { AlertColor } from "@mui/material";
import { PostI } from "../model/post/Post.interface";

export type StateI = {
  isLoggedIn: boolean;
  user: string;
  userMessage: { message: string; type: AlertColor };
  posts: PostI[];
};

export enum Types {
  SetIsLoggedIn = "SET_IS_LOGGED_IN",
  SetUser = "SET_USER",
  SetPosts = "SET_POSTS",
  CreatePost = "CREATE_POST",
  SavePost = "SAVE_POST",
  DeletePost = "DELETE_POST",
  SetUserMessage = "SET_USER_MESSAGE",
}

export type ActionPayload = {
  [Types.SetIsLoggedIn]: {
    status: boolean;
  };
  [Types.SetUser]: {
    user: string;
  };
  [Types.SetPosts]: {
    posts: PostI[];
  };
  [Types.SavePost]: {
    savedPost: PostI;
  };
  [Types.CreatePost]: {
    createdPost: PostI;
  };
  [Types.DeletePost]: {
    id: number;
  };
  [Types.SetUserMessage]: {
    message: string;
    type: AlertColor;
  };
};
