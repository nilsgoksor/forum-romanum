import { Divider, List } from "@mui/material";
import { CommentI } from "../../../../model/comment/Comment.interface";
import { ForumComment } from "./ForumComment";

interface CommentsI {
  comments: CommentI[];
  onSaveComment(savedComment: CommentI): void;
  onDeleteComment(id: number): void;
}
export const Comments = ({
  comments,
  onSaveComment,
  onDeleteComment,
}: CommentsI) => {
  return (
    <List>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Divider component="li" />
          <ForumComment
            comment={comment}
            onSaveComment={onSaveComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      ))}
    </List>
  );
};
