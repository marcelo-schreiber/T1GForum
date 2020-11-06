import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// Components
import CreatePost from "./pages/auth/CreatePost";
import Dashboard from "./pages/auth/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/auth/UserPage";
import SinglePost from "./pages/auth/SinglePost";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  useEffect(() => {
    if (!localStorage.token) {
      return;
    }
    fetch("http://localhost:8080/auth/verify", {
      method: "POST",
      headers: {
        token: localStorage.token,
      },
    })
      .then(x => x.json())
      .then(res => (res === true ? setIsAuthenticated(true) : setIsAuthenticated(false)));
  }, []);

  const setAuth = (bool: Boolean) => {
    setIsAuthenticated(bool);
  };

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (!isAuthenticated ? <Landing /> : <Redirect to="/dashboard" />)}
          />
          <Route
            exact
            path="/login"
            render={() =>
              !isAuthenticated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={() =>
              !isAuthenticated ? (
                <Register setAuth={setAuth} />
              ) : (
                <Redirect to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard/create-post"
            render={() => (isAuthenticated ? <CreatePost /> : <Redirect to="/login" />)}
          />
          <Route
            exact
            path="/dashboard"
            render={() =>
              isAuthenticated ? (
                <Dashboard setAuth={setIsAuthenticated} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/user/:username"
            render={() =>
              isAuthenticated ? (
                <UserPage setAuth={setIsAuthenticated} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/posts/:id"
            render={() =>
              !isAuthenticated ? <Login setAuth={setAuth} /> : <SinglePost />
            }
          />
        </Switch>
      </Router>
    </>
  );
}
