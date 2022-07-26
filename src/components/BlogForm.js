import { useState } from "react";

export const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await addBlog({ newTitle, newAuthor, newUrl });
    if (success) {
      setNewTitle("");
      setNewAuthor("");
      setNewUrl("");
    }
  };

  return (
    <>
      <h2>Add new blog</h2>

      <form onSubmit={handleSubmit}>
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
          <button name="add" aria-labelledby="add blog" type="submit">
            add
          </button>
        </div>
      </form>
    </>
  );
};
