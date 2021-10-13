export interface PostI {
  id: number;
  body: string;
  author: string;
  comments?: CommentI[];
}

export interface CommentI {
  id: number;
  body: string;
  author: string;
}
