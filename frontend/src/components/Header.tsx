import React from "react";
import { Link } from "react-router-dom";

import { FaPlusSquare, FaSignOutAlt } from "react-icons/fa";
import "../static/styles/components/header.scss";

interface AuthProps {
  setAuth: (bool: Boolean) => void;
}

export const Header: React.FC<AuthProps> = ({ setAuth }) => {
  const logout = () => {
    localStorage.clear();
    setAuth(false);
  };

  return (
    <header>
      <h1 id="title">T1GForum</h1>
      <div className="header-content">
        <Link to="/dashboard/create-post">
          <button>
            Post something <FaPlusSquare size={24} />
          </button>
        </Link>

        <button onClick={logout}>
          Log out <FaSignOutAlt size={24} />
        </button>
      </div>
    </header>
  );
};
