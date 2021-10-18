import { useContext, useState } from "react";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import { AppContext } from "../../../../state";
import { CreateCommentI } from "../../../../model/comment/Comment.interface";

interface CreateNewCommentI {
  postId: number;
  onCreateComment(createdComment: CreateCommentI): void;
}

export const CreateNewComment = ({
  postId,
  onCreateComment,
}: CreateNewCommentI) => {
  const { state } = useContext(AppContext);
  const { user } = state;

  const [body, setBody] = useState("");

  const onCreateHandler = () => {
    onCreateComment({
      postId: postId,
      body: body,
      author: user,
      dateCreated: new Date(),
    });
    setBody("");
  };

  return (
    <ListItem>
      <ListItemText
        primary={
          <TextField
            fullWidth
            autoFocus
            multiline
            placeholder="What's on your mind?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        }
        secondary={
          <Button
            onClick={() => onCreateHandler()}
            disabled={body.length === 0}
          >
            Comment
          </Button>
        }
      />
    </ListItem>
  );
};
