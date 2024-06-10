
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

  async function handleSubmitForm(e) {
    e.preventDefault();

    // Define the URL of your users endpoint
  const usersUrl = 'http://localhost:3000/users';

  try {
    // Fetch the users data from your database
    const response = await fetch(usersUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    // Find the user with the matching name
    const user = users.find((u) => u.name === username);

    // Check if the user exists and the password matches
    if (user && user.password === password) {
      console.log('User signed in successfully:', user);
      // Here you would handle the successful sign in (e.g., redirect to a dashboard)
    } else {
      console.log('Invalid username or password');
      // Here you would handle the failed sign in (e.g., show an error message)
    }
  } catch (error) {
    console.error('Could not fetch users:', error);
  }

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
