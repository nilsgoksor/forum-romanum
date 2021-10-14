export interface CreatePostI {
  body: string;
  author: string;
}
export interface PostI extends CreatePostI {
  id: number;
  nbrOfComments?: number;
}

export interface CommentI {
  id: number;
  postId: number;
  body: string;
  author: string;
}
