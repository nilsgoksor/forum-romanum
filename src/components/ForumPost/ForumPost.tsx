import { useContext, useState } from "react";
import { PostI } from "../../model/post/Post.interface";
import {
  Button,
  CardActions,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import * as S from "./ForumPost.styles";
import CommentIcon from "@mui/icons-material/Comment";
import { AppContext } from "../../state";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ForumPostI extends PostI {
  onSavePost(post: PostI): void;
  onDeletePost(id: number): void;
}
export const ForumPost = ({
  id,
  author,
  body,
  nbrOfComments,
  onSavePost,
  onDeletePost,
}: ForumPostI) => {
  const { state } = useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(body);
  const [showComments, setShowComments] = useState(false);

  const userIsAuthor = state.user === author;

  return (
    <S.ForumPostContainer>
      <CardContent>
        <h3>{author}</h3>
        {!editing ? (
          <p>{body}</p>
        ) : (
          <TextField
            fullWidth
            autoFocus
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        )}
      </CardContent>
      <CardActions>
        {userIsAuthor && (
          <IconButton onClick={() => setEditing(!editing)}>
            <EditIcon />
          </IconButton>
        )}
        {editing && (
          <Button
            onClick={() => {
              onSavePost({ id: id, body: editBody, author: author });
              setEditBody("");
              setEditing(false);
            }}
          >
            Save
          </Button>
        )}
        {userIsAuthor && (
          <IconButton onClick={() => onDeletePost(id)}>
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton onClick={() => setShowComments(!showComments)}>
          <p>{nbrOfComments}</p>
          <CommentIcon />
        </IconButton>
      </CardActions>
      {showComments && typeof id === "number" && <p>comments</p>}
    </S.ForumPostContainer>
  );
};
