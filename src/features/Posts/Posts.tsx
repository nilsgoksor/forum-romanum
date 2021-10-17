import * as S from "./Posts.styles";
import { PostI } from "../../model/post/Post.interface";
import { ForumPost } from "./ForumPost";

interface PostsI {
  posts: PostI[];
}

export const Posts = ({ posts }: PostsI) => {
  return (
    <S.PostsContainer>
      {posts.map((post) => (
        <ForumPost key={post.id} post={post} />
      ))}
    </S.PostsContainer>
  );
};
