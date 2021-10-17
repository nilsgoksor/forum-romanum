import { useContext, useEffect, useState } from "react";
import { PostI } from "../../../model/post/Post.interface";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import * as S from "./ForumPost.styles";
import EditIcon from "@mui/icons-material/Edit";
import CommentIcon from "@mui/icons-material/Comment";
import { AppContext, Types } from "../../../state";
import moment from "moment";
import axios from "axios";
import { MessageType } from "../../../components/UserMessage";

interface ForumPostI {
  post: PostI;
}

export const ForumPost = ({ post }: ForumPostI) => {
  const { state, dispatch } = useContext(AppContext);

  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(post.body);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (editing) {
      setShowComments(false);
    }
  }, [editing]);

  const userIsAuthor = state.user === post.author;

  const onSaveHandler = () => {
    const savedPost: PostI = {
      ...post,
      body: editBody,
    };
    axios
      .put<PostI>(`http://localhost:1337/posts/${savedPost.id}`, savedPost)
      .then(() => {
        dispatch({
          type: Types.SavePost,
          payload: { savedPost: savedPost },
        });
      })
      .catch(() => {
        dispatch({
          type: Types.SetUserMessage,
          payload: { message: "Error saving post", type: MessageType.ERROR },
        });
      });

    setEditBody("");
    setEditing(false);
  };

  const onDeleteHandler = () => {
    axios
      .delete(`http://localhost:1337/posts/${post.id}`)
      .then(() => {
        dispatch({
          type: Types.DeletePost,
          payload: { id: post.id },
        });
      })
      .catch(() => {
        dispatch({
          type: Types.SetUserMessage,
          payload: { message: "Error deleting post", type: MessageType.ERROR },
        });
      });
    setEditBody("");
    setEditing(false);
  };

  return (
    <S.ForumPostContainer>
      <CardHeader
        avatar={<Avatar>{post.author[0]}</Avatar>}
        action={
          userIsAuthor && (
            <IconButton onClick={() => setEditing(!editing)}>
              <EditIcon />
            </IconButton>
          )
        }
        title={post.author}
        subheader={moment(post.dateCreated).fromNow()}
      />
      <CardContent>
        {!editing ? (
          <p>{post.body}</p>
        ) : (
          <TextField
            fullWidth
            autoFocus
            multiline
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        )}
      </CardContent>
      <CardActions>
        {!editing ? (
          <>
            <IconButton onClick={() => setShowComments(!showComments)}>
              <CommentIcon />
            </IconButton>
            <p>{post.nbrOfComments}</p>
          </>
        ) : (
          <>
            <Button
              onClick={() => onSaveHandler()}
              disabled={editBody.length === 0}
            >
              Save
            </Button>
            <Button onClick={() => onDeleteHandler()}>Delete</Button>
          </>
        )}
      </CardActions>
      <Collapse in={showComments} timeout="auto" unmountOnExit>
        {showComments && <p>comments</p>}
      </Collapse>
    </S.ForumPostContainer>
  );
};
