import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { transitionSpring } from "../utils/animationProps";
import { FaAngleLeft, FaAngleDoubleRight, FaUserPlus } from "react-icons/fa";

import "../static/styles/register.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { url } from "../utils/apiUrl";

interface AuthProps {
  setAuth: (bool: Boolean) => void;
}

export default function Register({ setAuth }: AuthProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({ name, email, password }),
      });

      const parseRes = await response.json();

      console.log("response: ", parseRes);

      if (parseRes.jwtToken) {
        localStorage.clear();
        localStorage.setItem("token", parseRes.jwtToken);

        setAuth(true);
        toast.success("Your account has been created");
      } else {
        setName("");
        setEmail("");
        setPassword("");
        toast.error("Username or email are already taken");
      }
    } catch (err) {
      toast.error("Invalid Email/Password");
      console.error(err.message);
    }
  };

  return (
    <div className="register-content">
      <motion.div
        animate={{ scale: 1.15 }}
        transition={transitionSpring}
        className="form-container">
        <Link to="/" className="go-back">
          <FaAngleLeft size={48} />
        </Link>
        <form onSubmit={handleSubmit} id="register-form">
          <ToastContainer />
          <h1 id="register">
            <FaUserPlus size={64} /> Register
          </h1>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            minLength={2}
            required
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={4}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>

        <p className="go-to-login">
          Already have an account?
          <br />
          <Link to="/login">
            <span>Login </span>
            <FaAngleDoubleRight />
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
