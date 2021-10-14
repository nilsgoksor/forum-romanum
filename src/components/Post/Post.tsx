import { useContext, useState } from "react";
import { PostI } from "../../model/post/Post.interface";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CardActions, CardContent, IconButton, TextField } from "@mui/material";
import * as S from "./Post.styles";
import { AppContext } from "../../state";
import axios from "axios";

interface MyPostI extends PostI {
  editing?: boolean;
  cancelEditing?(): void;
}

export const Post = ({
  id,
  author,
  body,
  nbrOfComments,
  editing,
  cancelEditing,
}: MyPostI) => {
  const { state } = useContext(AppContext);
  const [editingPost, setEditingPost] = useState(editing);
  const [content, setContent] = useState(body);
  const [showComments, setShowComments] = useState(false);

  const onCancelHandler = () => {
    setEditingPost(false);
    cancelEditing && cancelEditing();
  };

  const onDeleteHandler = () => {
    axios
      .delete(`http://localhost:1337/posts/${id}`)
      .then(() => console.log("Post deleted"))
      .catch(() => console.log("Error deleeting post"));
  };

  return (
    <S.PostContainer>
      <CardContent>
        <h3>{author}</h3>
        {!editingPost ? (
          <p>{content}</p>
        ) : (
          <TextField
            fullWidth
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}
      </CardContent>
      <CardActions>
        {!editingPost && typeof id !== "undefined" ? (
          <>
            {author === state.author && (
              <>
                <IconButton onClick={() => setEditingPost(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDeleteHandler()}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            <IconButton onClick={() => setShowComments(!showComments)}>
              <p>{nbrOfComments}</p>
              <CommentIcon />
            </IconButton>
            {showComments && <p>comments</p>}
          </>
        ) : (
          <p>actions</p>
        )}
      </CardActions>
    </S.PostContainer>
  );
};
