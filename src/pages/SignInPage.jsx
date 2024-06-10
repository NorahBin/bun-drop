import React from "react";
import SignInComponent from "../components/SignInComponent";

function SignInPage({ setUser }) {
  return (

    //Tar emot en setuser prop som är en funktion från app.jsc för att hantera user authentication
    <>
      <SignInComponent setUser={setUser} />
    </>
  );
}

export default SignInPage;
