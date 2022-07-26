import { useState } from "react";

export const BlogForm = ({ onSubmit }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const createBlog = async (event) => {
    event.preventDefault();
    const result = await onSubmit({ newTitle, newAuthor, newUrl });
    if (result) {
      console.log("added");
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    }
  };

  return (
    <>
      <h2>Add new blog</h2>

      <form onSubmit={createBlog}>
        <div>
          title:{" "}
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
