export const BlogForm = ({
  onSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  return (
    <>
      <h2>Add new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          title: <input value={title} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};
