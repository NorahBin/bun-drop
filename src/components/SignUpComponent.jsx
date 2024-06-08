import React from "react";
import { useState } from "react";

function SignUpComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState(""); // Add state for password

  function handleNameChange(e) {
    setName(e.target.value);
  }



  function handlePasswordChange(e) {
    // Add handler for password change
    setPassword(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    //Skicka vår nya user till en databas
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, password: password }), // Include password in the POST request
    };

    fetch("http://localhost:3000/users", postOptions);

    //Städa upp inputs
    setName("");
    setPassword(""); // Clear password input
  }

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
    
        <input
          type="password"
          placeholder="Password" 
          onChange={handlePasswordChange}
          value={password}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default SignUpComponent;
