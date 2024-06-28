import React, { useState } from "react";

function SignUpComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  //Funktion för att hantera name input change
  function handleNameChange(e) {
    setName(e.target.value);
  }

  //Funktion för att hantera password input change

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault(); //prevents default form submission behaviour

    //Skapar ett postOptions objekt för ett POST request
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, password: password }),
    };

    //Skickar post request till server
    fetch("http://localhost:3000/users", postOptions);

    setName("");
    setPassword("");
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-text">Sign Up</h1>
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
              placeholder="Username"
              onChange={handleNameChange}
              value={name}
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
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div className="button-container">
            <button className="auth-button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpComponent;
