import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInComponent({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    // Kollar om input fields är tomma, isf return.
    if (username === "" || password === "") {
      
      return;
    }

    const usersUrl = "http://localhost:3000/users";

    try {
      const response = await fetch(usersUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = await response.json();
      const user = users.find((u) => u.name === username);

      if (user && user.password === password) {
        console.log("User signed in successfully:", user);
        setUser(user);
        navigate("/");
      } else {
        console.log("Invalid username or password");
      }
    } catch (error) {
      console.error("Could not fetch users:", error);
    }

    setUsername("");
    setPassword("");
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-text">Sign In</h2>
        <div className="auth-redline"></div>
        <form onSubmit={handleSubmitForm}>
          <div className="input-container">
            <label className="input-text" htmlFor="username">
              Username:
            </label>
            <input
              className="input-field"
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className="input-container" style={{ marginTop: "2%" }}>
            <label className="input-text" htmlFor="password">
              Password:
            </label>
            <input
              className="input-field"
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="button-container">
            <button className="auth-button" type="submit">
              Sign In
            </button>
            <NavLink to="/signuppage" className="link">
              <p className="link-text">Sign up</p>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInComponent;
