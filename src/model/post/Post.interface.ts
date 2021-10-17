export interface CreatePostI {
  body: string;
  author: string;
  nbrOfComments: number;
  dateCreated: Date;
}
export interface PostI extends CreatePostI {
  id: number;
}
