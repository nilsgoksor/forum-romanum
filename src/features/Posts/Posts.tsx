import { useState } from "react";
import * as S from "./Posts.styles";
import { CreateNewPost } from "./CreateNewPost";
import { Post } from "../../components/Post";

export const Posts = () => {
  const [createNewPost, setCreateNewPost] = useState(false);

  const posts = [
    {
      id: 1,
      body: "Hello mate this is a very long text probably two or five rows I donno I will add some more just to be safe lad",
      author: "Nils",
    },
    {
      id: 2,
      body: "Hello mate",
      author: "Nils",
      comments: [
        {
          id: 21,
          body: "Hello mate this is a very long text probably two or five rows I donno I will add some more just to be safe lad",
          author: "Johan",
        },
        {
          id: 22,
          body: "My second comment",
          author: "Johan",
        },
      ],
    },
    { id: 3, body: "Hello mate", author: "Nils" },
  ];

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
