import { useState, useEffect } from "react";
import { PostI } from "../model/post/Post.interface";
import axios from "axios";

export const UseFetchPosts = (): {
  posts: PostI[];
  loading: boolean;
  error: string;
} => {
  const [posts, setPosts] = useState<PostI[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setLoading(true);
    axios
      .get<PostI[]>("http://localhost:1337/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setError("Error fetching data");
        setLoading(false);
      });
  }, []);

  return { posts, loading, error };
};
