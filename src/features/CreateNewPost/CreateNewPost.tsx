import { useContext, useState } from "react";
import { Button, CardActions, CardContent, TextField } from "@mui/material";
import * as S from "./CreateNewPost.styles";
import { AppContext, Types } from "../../state";
import { CreatePostI, PostI } from "../../model/post/Post.interface";
import axios from "axios";
import { MessageType } from "../../components/UserMessage";

export const CreateNewPost = () => {
  const { state, dispatch } = useContext(AppContext);
  const { isLoggedIn, user } = state;

  const [creating, setCreating] = useState(false);
  const [body, setBody] = useState("");

  const onCreateHandler = () => {
    const createdPost: CreatePostI = {
      body: body,
      author: user,
      nbrOfComments: 0,
      dateCreated: new Date(),
    };
    axios
      .post<PostI>(`http://localhost:1337/posts`, createdPost)
      .then((res) => {
        setCreating(false);
        setBody("");
        dispatch({
          type: Types.CreatePost,
          payload: { createdPost: { id: res.data.id, ...createdPost } },
        });
      })
      .catch(() => {
        dispatch({
          type: Types.SetUserMessage,
          payload: { message: "Error creating post", type: MessageType.ERROR },
        });
      });
    return state;
  };

  if (!isLoggedIn) {
    return (
      <S.CreateNewPostContainer>
        <p>Login to contribute to the forum</p>
      </S.CreateNewPostContainer>
    );
  }

  return (
    <S.CreateNewPostContainer>
      <p>{`Welcome ${user}!`}</p>
      <p>Create a new post or contribute to one of the topics below</p>

      {!creating ? (
        <Button onClick={() => setCreating(true)}>Create new post</Button>
      ) : (
        <S.PostContainer>
          <CardContent>
            <TextField
              fullWidth
              placeholder="What's on your mind?"
              autoFocus
              multiline
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={() => onCreateHandler()}
              disabled={body.length === 0}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                setCreating(false);
                setBody("");
              }}
            >
              Cancel
            </Button>
          </CardActions>
        </S.PostContainer>
      )}
    </S.CreateNewPostContainer>
  );
};
