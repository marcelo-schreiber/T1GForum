import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Post } from "../../components/Post";
import { Header } from "../../components/Header";
import { FaAngleLeft } from "react-icons/fa";

import "../../static/styles/auth/userPage.scss";
import { url } from "../../utils/apiUrl";

interface Username {
  username: string;
}

interface PostItems {
  id: string;
  author: string;
  description: string;
  section: string;
  image_path: string;
}

interface AuthProps {
  setAuth: (bool: Boolean) => void;
}

export default function UserPage({ setAuth }: AuthProps) {
  const history = useHistory();
  const { username } = useParams<Username>();
  const [userPosts, setUserPosts] = useState<PostItems[]>([]);
  const [userSeingPost, setUserSeingPost] = useState({
    name: "",
  });

  useEffect(() => {
    fetch(`${url}/posts/${username}`)
      .then(x => x.json())
      .then(res => setUserPosts(res));

    fetch(`${url}/username`, {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    })
      .then(x => x.json())
      .then(res => setUserSeingPost(res));
  }, [username]);

  return (
    <>
      <Header setAuth={setAuth} />
      <div className="background">
        {userPosts.length > 0 ? (
          <div style={{ margin: "0 10vw" }}>
            <div className="go-back">
              <button onClick={history.goBack}>
                <FaAngleLeft size={32} />
              </button>
              {userSeingPost.name === username ? (
                <p>Your page</p>
              ) : (
                <p>{username}'s page</p>
              )}
            </div>

            <div className="posts-container">
              {userPosts.map((post: PostItems, i) => {
                return <Post postProps={post} key={i} isSingle={false} />;
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="go-back">
              <button onClick={history.goBack}>
                <FaAngleLeft size={32} />
              </button>
            </div>
            <div className="no-posts">
              <p>
                No posts were made in this account, please, create one by clicking in
                'Post something'
              </p>
            </div>
          </>
        )}
      </div>
      )
    </>
  );
}
