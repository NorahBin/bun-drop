// import React from "react";
// import { useState } from "react";

// function SignUpComponent() {
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState(""); // Add state for password

//   function handleNameChange(e) {
//     setName(e.target.value);
//   }



//   function handlePasswordChange(e) {
  
//     setPassword(e.target.value);
//   }

//   function handleSubmitForm(e) {
//     e.preventDefault();

//     //Skicka vår nya user till en databas
//     const postOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name: name, password: password }), // Include password in the POST request
//     };

//     fetch("http://localhost:3000/users", postOptions);

//     //Städa upp inputs
//     setName("");
//     setPassword(""); 
//   }

//   return (
//     <>
//       <div className="sign-up-container">
//         <div className="sign-up-box">
//           <h1 className="sign-up-text-title">Sign Up</h1>
//           <div className="sign-up-redline"></div>

//           <form onSubmit={handleSubmitForm}>
//             <div className="sign-up-username-container">
//               <h2>Username:</h2>
//               <input
//               className="sign-up-username-input"
//                 type="text"
//                 placeholder="Username"
//                 onChange={handleNameChange}
//                 value={name}
//               />
//             </div>

//             <div className="sign-up-password-container">
//               <h2>Password</h2>

//               <input
//               className="sign-up-password-input"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handlePasswordChange}
//                 value={password}
//               />
//               <button className="register-button" type="submit">Register</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SignUpComponent;
import React, { useState } from "react";

function SignUpComponent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, password: password }),
    };

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
