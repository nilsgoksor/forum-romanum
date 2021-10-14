import * as S from "./Posts.styles";
import { Post } from "../../components/Post";
import { UseFetchPosts } from "../../hooks";

export const Posts = () => {
  const { posts, loading, error } = UseFetchPosts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data. Perhaps the database is down?</p>;
  }

  return (
    <S.PostsContainer>
      <div>
        <S.PostContainer>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              body={post.body}
              author={post.author}
            />
          ))}
        </S.PostContainer>
      </div>
    </S.PostsContainer>
  );
};
