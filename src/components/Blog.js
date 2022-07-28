import { useState } from "react";

export const Blog = ({ blog, handleLike, isOwner }) => {
  const [viewAllInfo, setViewAllInfo] = useState(false);
  const [likeStyle, setLikeStyle] = useState("likes");

  const toggleView = () => {
    setViewAllInfo(!viewAllInfo);
    setLikeStyle("likes");
    console.log(blog.user);
  };
  return (
    <div>
      <p
        onClick={() => {
          toggleView();
        }}
      >
        {blog.title} <span className="debug">{isOwner.toString()}</span>
      </p>{" "}
      {!viewAllInfo && (
        <button onClick={() => toggleView()} name="view" aria-labelledby="view">
          view
        </button>
      )}
      {viewAllInfo && (
        <button
          onClick={() => {
            toggleView();
          }}
          name="hide"
          aria-labelledby="hide"
        >
          hide
        </button>
      )}
      <div>
        {viewAllInfo && (
          <>
            {blog.author}
            <br />
          </>
        )}
        {viewAllInfo && (
          <>
            {blog.url}
            <br />
          </>
        )}
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
    </div>
  );
};
