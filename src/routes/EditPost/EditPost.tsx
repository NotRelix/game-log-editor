import { useEffect, useState, type FormEvent } from "react";
import type { EditPostType } from "../../types";
import { useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";

const emptyPost: EditPostType = {
  title: "",
  body: "",
  published: false,
  headerImg: null,
  headerImgPath: "",
};

const EditPost = () => {
  const [data, setData] = useState<EditPostType>(emptyPost);
  const token = localStorage.getItem("token");
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}posts/${postId}`
      );
      const result = await response.json();
      setData(result.post);
    };

    fetchData();
  }, []);

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
      const response = await fetch(`http://localhost:3000/posts/${postId}`, {
        method: "PATCH",
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
      <h1>Edit Post</h1>
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
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              setData((prev) => ({
                ...prev,
                headerImg: file,
                headerImgPath: previewUrl,
              }));
            }
          }}
          type="file"
          id="headerImg"
          name="headerImg"
        />
        {data.headerImgPath && <img src={data.headerImgPath} alt="" />}
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
          value={data.body}
        />
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
};

export default EditPost;
