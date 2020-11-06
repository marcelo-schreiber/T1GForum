import React from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { transitionSpring } from "../utils/animationProps";

import "../static/styles/landingPage.scss";

export default function Landing() {
  return (
    <div className="landing-content">
      <div className="landing-head">
        <motion.h1
          animate={{ scale: 2 }}
          transition={transitionSpring}
          className="welcome">
          Welcome to <br />
          <span>T1GForum</span>
        </motion.h1>
        <motion.p
          className="share"
          animate={{ scale: 1.5 }}
          transition={transitionSpring}>
          Share your world.
        </motion.p>
      </div>
      <div className="button-container">
        <Link to="/login">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            Login
          </motion.button>
        </Link>
        <Link to="/register">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
            Register
          </motion.button>
        </Link>
        <a
          href="https://github.com/marcelo-schreiber"
          target="_blank"
          rel="noreferrer"
          id="github">
          <FaGithub size={64} />
        </a>
      </div>
    </div>
  );
}
