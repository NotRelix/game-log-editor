import { useState, type FormEvent } from "react";
import type { CreatePostType } from "../../types";
import { Editor } from "@tinymce/tinymce-react";

const emptyPost: CreatePostType = {
  title: "",
  body: "",
  published: false,
  headerImg: null,
};

const CreatePost = () => {
  const [data, setData] = useState<CreatePostType>(emptyPost);
  const token = localStorage.getItem("token");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("body", data.body);
      formData.append("published", String(data.published));
      if (data.headerImg) {
        formData.append("headerImg", data.headerImg);
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
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
          value={data.title}
          type="text"
          id="title"
          name="title"
        />
        <label htmlFor="body">Body</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, body: e.target.value }));
          }}
          value={data.body}
          type="text"
          id="body"
          name="body"
        />
        <label htmlFor="published">Publish</label>
        <input
          onChange={(e) => {
            setData((prev) => ({ ...prev, published: e.target.checked }));
          }}
          checked={data.published}
          type="checkbox"
          id="published"
          name="published"
        />
        <label htmlFor="headerImg">Header Image</label>
        <input
          onChange={(e) => {
            const file = e.target.files?.[0];
            setData((prev) => ({ ...prev, headerImg: file }));
          }}
          type="file"
          id="headerImg"
          name="headerImg"
        />
        <Editor
          onEditorChange={(content) => {
            setData((prev) => ({ ...prev, body: content }));
          }}
          apiKey="xtq79ommu7urglenigl25zxeleh6igtsvsasixldnzsyosty"
          init={{
            plugins: [
              "autolink",
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "image",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            onboarding: false,
            uploadcare_public_key: "5a35ee7cf26568c9909e",
          }}
          initialValue="Welcome to my Blog!"
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
