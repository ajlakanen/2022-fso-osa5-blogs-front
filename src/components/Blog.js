import { useState } from "react";

export const Blog = ({ blog, handleLike }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);
  const [likeStyle, setLikeStyle] = useState("likes");

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
          onClick={() => {
            setViewAllInfo(false);
            setLikeStyle("likes");
          }}
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
          likes: <span className={likeStyle}>{blog.likes}</span>{" "}
          <button
            onClick={() => {
              handleLike(blog);
              if (likeStyle.includes("clicked")) {
                setLikeStyle("likes");
                setTimeout(() => {
                  setLikeStyle("likes clicked");
                }, 10);
              } else {
                setLikeStyle("likes clicked");
              }
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
