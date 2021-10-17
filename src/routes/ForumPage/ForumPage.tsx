import { useContext } from "react";
import { Posts } from "../../features/Posts";
import { CreateNewPost } from "../../features/CreateNewPost";
import axios from "axios";
import { AppContext, Types } from "../../state";
import { MessageType, UserMessage } from "../../components/UserMessage";

export const ForumPage = () => {
  const [posts, setPosts] = useState<PostI[]>([]);

  const fetchData = () =>
    axios
      .get<PostI[]>("http://localhost:1337/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) => {});

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreatePost = (newPost: CreatePostI) => {
    axios
      .post(`http://localhost:1337/posts`, newPost)
      .then(() => fetchData())
      .catch(() => console.log("Error creating post"));
  };

  const handleSavePost = (newPost: PostI) => {
    axios
      .put(`http://localhost:1337/posts/${newPost.id}`, newPost)
      .then(() => fetchData())
      .catch(() => console.log("Error saving post"));
  };

  const handleDeletePost = (id: number) => {
    axios
      .delete(`http://localhost:1337/posts/${id}`)
      .then(() => fetchData())
      .catch(() => console.log("Error deleting post"));
  };

  return (
    <>
      <UserMessage
        message={userMessage.message}
        handleClose={() =>
          dispatch({
            type: Types.SetUserMessage,
            payload: { message: "", type: MessageType.SUCCESS },
          })
        }
        type={userMessage.type}
      />
      <Posts
        posts={posts}
        onSavePost={(post: PostI) => handleSavePost(post)}
        onDeletePost={(id: number) => handleDeletePost(id)}
      />
    </>
  );
};
