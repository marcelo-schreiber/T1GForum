import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { FaAngleLeft, FaAngleDoubleRight, FaUserCircle } from "react-icons/fa";
import { transitionSpring } from "../utils/animationProps";

import "react-toastify/dist/ReactToastify.min.css";
import "../static/styles/login.scss";
import { url } from "../utils/apiUrl";

interface AuthProps {
  setAuth: (bool: Boolean) => void;
}

export default function Login({ setAuth }: AuthProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ email, password }),
      });

      setEmail("");
      setPassword("");

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.clear();
        localStorage.setItem("token", parseRes.jwtToken);

        setAuth(true);
      } else {
        toast.error("Invalid Email/Password");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-content">
        <motion.div
          animate={{ scale: 1.15 }}
          transition={transitionSpring}
          className="form-container">
          <Link to="/" className="go-back">
            <FaAngleLeft size={48} />
          </Link>
          <form onSubmit={handleSubmit} id="login-form">
            <h1 id="login">
              <FaUserCircle size={64} />
              Login
            </h1>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
              required
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={4}
              placeholder="Password"
              autoComplete="off"
              required
            />
            <motion.button
              type="submit"
              id="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}>
              Login
            </motion.button>
          </form>
          <p className="go-to-register">
            Not a member?
            <br />
            <Link to="/register">
              <span>Sign up</span>
              <FaAngleDoubleRight />
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
