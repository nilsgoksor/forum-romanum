import * as S from "./Posts.styles";
import { PostI } from "../../model/post/Post.interface";
import { ForumPost } from "../../components/ForumPost";

interface PostsI {
  posts: PostI[];
  onSavePost(post: PostI): void;
  onDeletePost(id: number): void;
}

export const Posts = ({ posts, onSavePost, onDeletePost }: PostsI) => {
  return (
    <S.PostsContainer>
      <S.PostContainer>
        {posts.map((post) => (
          <ForumPost
            key={post.id}
            {...post}
            onSavePost={onSavePost}
            onDeletePost={onDeletePost}
          />
        ))}
      </S.PostContainer>
    </S.PostsContainer>
  );
};
