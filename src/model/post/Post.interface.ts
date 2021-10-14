export interface PostI {
  id?: number;
  body: string;
  author: string;
  nbrOfComments?: number;
}

export interface CommentI {
  id: number;
  postId: number;
  body: string;
  author: string;
}
