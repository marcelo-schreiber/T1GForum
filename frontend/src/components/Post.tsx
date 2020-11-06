import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaComment } from "react-icons/fa";

import "../static/styles/components/post.scss";

interface PostInterface {
  postProps: {
    id: string;
    author: string;
    description: string;
    section: string;
    image_path: string;
  };
  isSingle: boolean;
}

export const Post: React.FC<PostInterface> = ({ postProps, isSingle }) => {
  return (
    <div className="post">
      <div className="author">
        <p className="user">
          <FaUserCircle size={32} />
          <Link to={`/user/${postProps.author}`}>{postProps.author}</Link>
        </p>
        <p>{postProps.section}</p>
      </div>
      <div className="gray-stripe"></div>
      <img src={postProps.image_path} alt={postProps.author} />
      <p className="description">{postProps.description}</p>
      {!isSingle && (
        <Link to={`/posts/${postProps.id}`} className="comments">
          <button className="btn-comment">
            Comments
            <FaComment size={32} color="#fafafafa" />
          </button>
        </Link>
      )}
    </div>
  );
};
