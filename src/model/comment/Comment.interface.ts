export interface CreateCommentI {
  postId: number;
  body: string;
  author: string;
  dateCreated: Date;
}

export interface CommentI extends CreateCommentI {
  id: number;
}
