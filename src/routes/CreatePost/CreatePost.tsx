import { useState, type FormEvent } from "react";
import type { CreatePostType } from "../../types";

const emptyPost: CreatePostType = {
  title: "",
  body: "",
  published: false,
};

const CreatePost = () => {
  const [data, setData] = useState<CreatePostType>(emptyPost);
  const token = localStorage.getItem("token");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!result.success) {
        console.error(result.messages);
      } else {
        setData(emptyPost);
        console.log(result.messages);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, title: e.target.value }));
          }}
          type="text"
          id="title"
          name="title"
        />
        <label htmlFor="body">Body</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, body: e.target.value }));
          }}
          type="text"
          id="body"
          name="body"
        />
        <label htmlFor="published">Publish</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, published: e.target.checked }));
          }}
          type="checkbox"
          id="published"
          name="published"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
