import { useContext, useEffect } from "react";
import { Posts } from "../../features/Posts";
import { CreateNewPost } from "../../features/CreateNewPost";
import axios from "axios";
import { PostI } from "../../model/post/Post.interface";
import { AppContext, Types } from "../../state";
import { MessageType, UserMessage } from "../../components/UserMessage";

export const ForumPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const { posts, userMessage } = state;

  useEffect(() => {
    axios
      .get<PostI[]>("http://localhost:1337/posts")
      .then((res) => {
        dispatch({ type: Types.SetPosts, payload: { posts: res.data } });
      })
      .catch(() => {
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Error loading posts. Is the database on?",
            type: MessageType.ERROR,
          },
        });
      });
  }, [dispatch]);

  return (
    <>
      <UserMessage
        message={userMessage.message}
        handleClose={() =>
          dispatch({
            type: Types.SetUserMessage,
            payload: { message: "", type: MessageType.SUCCESS },
          })
        }
        type={userMessage.type}
      />
      <CreateNewPost />
      <Posts posts={posts} />
    </>
  );
};
