import { useState } from "react";
import * as S from "./Posts.styles";
import { CreateNewPost } from "./CreateNewPost";
import { Post } from "../../components/Post";
import { UseFetchPosts } from "../../hooks";

export const Posts = () => {
  const [createNewPost, setCreateNewPost] = useState(false);

  const { posts, loading, error } = UseFetchPosts();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <S.PostsContainer>
      <div>
        <p>Create a new post or contribute to one of the topics below</p>
        <button onClick={() => setCreateNewPost(!createNewPost)}>
          {!createNewPost ? "Create new post" : "Cancel"}
        </button>
        {createNewPost ? (
          <CreateNewPost />
        ) : (
          <S.PostContainer>
            {posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                body={post.body}
                author={post.author}
                comments={post.comments}
              />
            ))}
          </S.PostContainer>
        )}
      </div>
    </S.PostsContainer>
  );
};
