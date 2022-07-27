import { useState } from "react";

export const Blog = ({ blog, handleLike }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);

  return (
    <div>
      {blog.title}{" "}
      {!viewAllInfo && (
        <button
          onClick={() => setViewAllInfo(true)}
          name="view"
          aria-labelledby="view"
        >
          view
        </button>
      )}
      {viewAllInfo && (
        <button
          onClick={() => setViewAllInfo(false)}
          name="hide"
          aria-labelledby="hide"
        >
          hide
        </button>
      )}
      {viewAllInfo && <span>{blog.author}</span>}
      {viewAllInfo && <span>{blog.url}</span>}
      {viewAllInfo && (
        <span>
          likes: {blog.likes}{" "}
          <button
            onClick={() => {
              handleLike(blog);
            }}
            name="like"
            aria-labelledby="like"
          >
            like
          </button>
        </span>
      )}
    </div>
  );
};
