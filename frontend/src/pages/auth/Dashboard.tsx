import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Header } from "../../components/Header";
import { Post } from "../../components/Post";

import ReactLoading from "react-loading";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "../../static/styles/auth/dashboard.scss";
import { url } from "../../utils/apiUrl";

interface PostItems {
  id: string;
  author: string;
  description: string;
  section: string;
  image_path: string;
}

interface Name {
  name: string;
}

interface AuthProps {
  setAuth: (bool: Boolean) => void;
}

export default function Dashboard({ setAuth }: AuthProps) {
  const [posts, setPosts] = useState<PostItems[]>([]);

  const [section, setSection] = useState("all");
  const [username, setUsername] = useState<Name>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  // pagination
  const POSTS_PER_PAGE = 6;
  const [page, setPage] = useState(0);

  const filteredPosts = posts.filter(post => {
    return section === "all" || section === post.section;
  });

  // slices from (0, 4) => (4, 8) => ...
  const postsInPage = filteredPosts.slice(page, page + POSTS_PER_PAGE);
  const currentPageIndex = page / POSTS_PER_PAGE + 1;
  const lastPageIndex = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const isOnFirstPage = page <= 1 ? true : false;
  const isOnLastPage = currentPageIndex >= lastPageIndex ? true : false;

  // get username and all posts
  useEffect(() => {
    fetch(`${url}/username`, {
      method: "GET",
      headers: {
        token: localStorage.token,
      },
    })
      .then(x => x.json())
      .then(res => setUsername(res));

    fetch(`${url}/posts`)
      .then(x => x.json())
      .then(res => {
        setPosts(res);
        setIsLoading(false);
      });
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(e.target.value);
    setPage(0);
  };

  return (
    <div className="dashboard-content">
      <Header setAuth={setAuth} />
      <div className="dashboard-items">
        <h2 id="greetings">
          Hello, <Link to={`/user/${username?.name}`}>{username?.name}</Link>
        </h2>
        <select value={section} onChange={handleSelect}>
          <option>all</option>
          <option>meme</option>
          <option>fenoxer</option>
          <option>anime</option>
          <option>art</option>
        </select>
        <div className="posts-container">
          {!isLoading ? (
            <>
              {postsInPage.map((post, index) => {
                return <Post key={index} postProps={post} isSingle={false} />;
              })}
            </>
          ) : (
            <div style={{ marginTop: "4rem" }}>
              <ReactLoading color="#5f7b23" type="spin" />
            </div>
          )}
        </div>
        <div className="pagination-buttons">
          {!isOnFirstPage && (
            <button
              onClick={() => {
                setPage(prev => prev - POSTS_PER_PAGE);
                window.scrollTo(0, 0);
              }}>
              <FaAngleLeft />
            </button>
          )}
          <p>You're on page {currentPageIndex}</p>
          {!isOnLastPage && (
            <button
              onClick={() => {
                setPage(prev => prev + POSTS_PER_PAGE);
                window.scrollTo(0, 0);
              }}>
              <FaAngleRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
