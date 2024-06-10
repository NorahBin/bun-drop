import React, { useState } from "react";

function SignInComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    // Here you would usually check the credentials against a database
    // For demonstration, we'll just log them to the console
    console.log("Signing in with:", { username, password });
    // Clear the input fields after submission
    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            onChange={handleUsernameChange}
            value={username}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInComponent;
