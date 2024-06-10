
import { NavLink } from "react-router-dom";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//tar setUser som en prop för att sätta user state
function SignInComponent({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  //Event handlers för username och password ändringar
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }


  //Event handler för form submission
  async function handleSubmitForm(e) {
    e.preventDefault();


    //End point för json databas
    const usersUrl = "http://localhost:3000/users";

    try {

        //Hämtar user data från databasen
      const response = await fetch(usersUrl);
      //Om response failar, visa error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    
      const users = await response.json();
     

      //Hittar user med matchande username
      const user = users.find((u) => u.name === username);


      //Om username matchar, logga in användaren
      if (user && user.password === password) {
        console.log("User signed in successfully:", user);
        setUser(user); // Sätter user state
        navigate("/"); // Redirect till homepage
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
        <NavLink to="/signuppage">
          <button >Sign up</button>
        </NavLink>
      </form>
    </div>
  );
}

export default SignInComponent;

