import { useEffect, useState } from "react";
import type { PostType } from "../../types";
import { useParams } from "react-router";

const Posts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (!result.success) {
          console.error("Failed to fetch user posts");
        }
        setPosts(result.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserPosts();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
          <span>{post.published}</span>
        </div>
      ))}
    </div>
  );
};

export default Posts;
