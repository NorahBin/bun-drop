
import React from "react";
import bundrop from "../images/bundrop.png";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  const handleSignOut = () => {
    // Set user to null to signify sign-out
    setUser(null);
  };

  let buttonText = user ? "Sign Out" : "Sign In";
  let buttonAction = user ? handleSignOut : null;

  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <img src={bundrop} alt="Logo" className="navbar-logo" />
        </NavLink>
        <div className="flexbox navbar-text">
          <NavLink to="/menupage">
            <h2 className="menu-text">MENU</h2>
          </NavLink>
          <NavLink to="/cartpage">
            <h2 className="cart-text">CART</h2>
          </NavLink>
          {user && (
            <NavLink to="/favoritepage">
              <h2 className="favorites-text">FAVORITES</h2>
            </NavLink>
          )}
          <h2 className="cart-text">ABOUT US</h2>
        </div>
        <NavLink to={user ? "/" : "/signinpage"}>
          <button className="sign-in" onClick={buttonAction}>
            {buttonText}
          </button>
        </NavLink>
      </div>
      <div className="navbar-underline"></div>
    </>
  );
}

export default NavBar;


