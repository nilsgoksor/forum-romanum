import { useContext, useEffect, useState } from "react";
import { CreateNewComment } from "./CreateNewComment";
import { Comments } from "./Comments";
import {
  CommentI,
  CreateCommentI,
} from "../../../../model/comment/Comment.interface";
import axios from "axios";
import { PostI } from "../../../../model/post/Post.interface";
import { MessageType } from "../../../../components/UserMessage";
import { Types, AppContext } from "../../../../state";

interface CommentSectionI {
  post: PostI;
  nbrOfComments: number;
  setNbrOfComments(count: number): void;
}
export const CommentSection = ({
  post,
  nbrOfComments,
  setNbrOfComments,
}: CommentSectionI) => {
  const { state, dispatch } = useContext(AppContext);
  const { isLoggedIn } = state;

  const [comments, setComments] = useState<CommentI[]>([]);

  const fetchComments = () => {
    axios
      .get<CommentI[]>(`http://localhost:1337/comments?postId=${post.id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateComment = (createdComment: CreateCommentI) => {
    axios
      .post(`http://localhost:1337/comments`, createdComment)
      .then(() => {
        setNbrOfComments(nbrOfComments + 1);
        const updatedPost = { ...post, nbrOfComments: nbrOfComments + 1 };
        axios.put(`http://localhost:1337/posts/${post.id}`, updatedPost);
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Commend posted",
            type: MessageType.SUCCESS,
          },
        });
        fetchComments();
      })
      .catch(() =>
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Error creating comment",
            type: MessageType.ERROR,
          },
        })
      );
  };

  const handleSaveComment = (savedComment: CommentI) => {
    axios
      .put(`http://localhost:1337/comments/${savedComment.id}`, savedComment)
      .then(() => {
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Comment edited",
            type: MessageType.SUCCESS,
          },
        });
        fetchComments();
      })
      .catch(() =>
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Error Saving comment",
            type: MessageType.ERROR,
          },
        })
      );
  };

  const handleDeleteComment = (id: number) => {
    axios
      .delete(`http://localhost:1337/comments/${id}`)
      .then(() => {
        setNbrOfComments(nbrOfComments - 1);
        const updatedPost = { ...post, nbrOfComments: nbrOfComments - 1 };
        axios.put(`http://localhost:1337/posts/${post.id}`, updatedPost);
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Commend deleted",
            type: MessageType.SUCCESS,
          },
        });
        fetchComments();
      })
      .catch(() =>
        dispatch({
          type: Types.SetUserMessage,
          payload: {
            message: "Error deleting comment",
            type: MessageType.ERROR,
          },
        })
      );
  };

  return (
    <>
      {isLoggedIn && (
        <CreateNewComment
          postId={post.id}
          onCreateComment={(createdComment: CreateCommentI) =>
            handleCreateComment(createdComment)
          }
        />
      )}
      <Comments
        comments={comments}
        onSaveComment={(createdComment: CommentI) =>
          handleSaveComment(createdComment)
        }
        onDeleteComment={(id: number) => handleDeleteComment(id)}
      />
    </>
  );
};
