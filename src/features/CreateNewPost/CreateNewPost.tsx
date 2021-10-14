import { useContext, useState } from "react";
import { Button, CardActions, CardContent, TextField } from "@mui/material";
import * as S from "./CreateNewPost.styles";
import { AppContext } from "../../state";
import { CreatePostI } from "../../model/post/Post.interface";

interface CreateNewPostI {
  onCreatePost(post: CreatePostI): void;
}

export const CreateNewPost = ({ onCreatePost }: CreateNewPostI) => {
  const { state } = useContext(AppContext);
  const { isLoggedIn, user } = state;

  const [creating, setCreating] = useState(false);
  const [body, setBody] = useState("");

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
              autoFocus
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={() => {
                setCreating(false);
                setBody("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onCreatePost({ body: body, author: user });
                setCreating(false);
                setBody("");
              }}
            >
              Create
            </Button>
          </CardActions>
        </S.PostContainer>
      )}
    </S.CreateNewPostContainer>
  );
};
