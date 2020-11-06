import React from "react";

import "../static/styles/components/comment.scss";

interface CommentsInterface {
  id: string;
  comment_author: string;
  content: string;
  date: string;
  post_id: string;
}

export const CommentSection: React.FC<any> = ({ commentData }) => {
  return (
    <div className="comment-section">
      <p>
        {commentData.length > 0
          ? `${commentData.length} comments in total`
          : "No comments yet :("}
      </p>
      {commentData.map((comment: CommentsInterface | null) => {
        if (!comment) {
          return null;
        }
        return (
          <div className="comment" key={comment?.id}>
            <div className="name-date">
              <h1>{comment.comment_author}</h1>
              <small>{comment.date}</small>
            </div>

            <p className="content">{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
};
