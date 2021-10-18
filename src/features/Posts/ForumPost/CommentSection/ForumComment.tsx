import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useContext, useState } from "react";
import { CommentI } from "../../../../model/comment/Comment.interface";
import { AppContext } from "../../../../state";
import EditIcon from "@mui/icons-material/Edit";

interface ForumCommentI {
  comment: CommentI;
  onSaveComment(savedComment: CommentI): void;
  onDeleteComment(id: number): void;
}
export const ForumComment = ({
  comment,
  onSaveComment,
  onDeleteComment,
}: ForumCommentI) => {
  const { state } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);

  const userIsAuthor = state.user === comment.author;

  return (
    <ListItem
      secondaryAction={
        userIsAuthor && (
          <IconButton onClick={() => setEditing(!editing)}>
            <EditIcon />
          </IconButton>
        )
      }
    >
      <ListItemAvatar>
        <Avatar alt={comment.author}>{comment.author[0]}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          !editing ? (
            <div>{comment.body}</div>
          ) : (
            <>
              <TextField
                fullWidth
                autoFocus
                multiline
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
              />
              <Button
                onClick={() => {
                  const savedComment = { ...comment, body: editBody };
                  onSaveComment(savedComment);
                  setEditing(false);
                  setEditBody("");
                }}
              >
                Save
              </Button>
              <Button onClick={() => onDeleteComment(comment.id)}>
                Delete
              </Button>
            </>
          )
        }
        secondary={`${comment.author} - ${moment(
          comment.dateCreated
        ).fromNow()}`}
      />
    </ListItem>
  );
};
