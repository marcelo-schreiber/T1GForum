import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Post } from "../../components/Post";
import { CommentSection } from "../../components/CommentSection";
import { FaUserCircle, FaAngleLeft } from "react-icons/fa";

import "../../static/styles/auth/singlePost.scss";

interface IdParams {
  id: string;
}

interface PostInterface {
  id: string;
  author: string;
  description: string;
  image_path: string;
  section: string;
}

interface CommentsInterface {
  id: string;
  comment_author: string;
  content: string;
  date: string;
  post_id: string;
}

export default function Comments() {
  const { id } = useParams<IdParams>();
  const history = useHistory();

  const [username, setUsername] = useState({ name: "" });
  const [singlePost, setSinglePost] = useState<
    [PostInterface | null, Array<CommentsInterface>]
  >([null, []]);

  // textarea input
  const [userComment, setUserComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/posts/content/${id}`)
      .then(x => x.json())
      .then(res => setSinglePost(res));
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/username", {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    })
      .then(x => x.json())
      .then(res => setUsername(res));
  }, []);

  const handleCommentSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetch("http://localhost:8080/create-comment", {
      method: "POST",
      headers: {
        token: localStorage.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment_author: username.name,
        content: userComment,
        post_id: parseInt(id),
      }),
    })
      .then(x => x.json())
      .then(res => console.log(res));

    window.location.reload();
  };

  return (
    <div className="background">
      <button className="go-back" onClick={history.goBack}>
        <FaAngleLeft size={32} />
      </button>
      {singlePost[0] && <Post postProps={singlePost[0]} isSingle={true} />}
      <form className="create-comment" onSubmit={handleCommentSubmit}>
        <div className="comment-area">
          <div className="user-snippet">
            <FaUserCircle size={23} />
            <h2>{username.name}</h2>
          </div>
          <textarea
            name="content"
            value={userComment}
            placeholder="Write a comment..."
            onChange={e => setUserComment(e.target.value)}
          />

          <button type="submit">Post Comment</button>
        </div>
      </form>
      {singlePost[1].length > 0 && <CommentSection commentData={singlePost[1]} />}
    </div>
  );
}
