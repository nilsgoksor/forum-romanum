import { useContext, useState } from "react";
import { Button } from "@mui/material";
import { Post } from "../../components/Post";
import * as S from "./CreateNewPost.styles";
import { AppContext } from "../../state";

export const CreateNewPost = () => {
  const { state } = useContext(AppContext);
  const { isLoggedIn, author } = state;

  const [creating, setCreating] = useState(false);

  if (!isLoggedIn) {
    return (
      <S.CreateNewPostContainer>
        <p>Login to contribute to the forum</p>
      </S.CreateNewPostContainer>
    );
  }

  return (
    <S.CreateNewPostContainer>
      <p>{`Welcome ${author}!`}</p>
      <p>Create a new post or contribute to one of the topics below</p>
      {!creating ? (
        <Button onClick={() => setCreating(true)}>Create new post</Button>
      ) : (
        <>
          <Post
            body={""}
            author={author}
            editing
            cancelEditing={() => setCreating(false)}
          />
        </>
      )}
    </S.CreateNewPostContainer>
  );
};
