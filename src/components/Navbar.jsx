import React from "react";
import bundrop from "../images/bundrop.png";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  const handleSignOut = () => {
    // Set user to null to sign out
    setUser(null);
    localStorage.removeItem("user"); //tar bort userdata från local storage så att usersession försvinner(loggas ut)
  };

  //Bestämmer button text och action baserat på user authentication state
  let buttonText = user ? "Sign Out" : "Sign In";
  let buttonAction = user ? handleSignOut : null;

  return (
    <div className="navbar">
      <NavLink to="/" className="navlink">
        <img src={bundrop} alt="Logo" className="navbar-logo" />
      </NavLink>
      <div className="navbar-links">
        <NavLink
          to="/menupage"
          className="navlink"
          activeClassName="active-navlink"
        >
          MENU
        </NavLink>
        <NavLink
          to="/cartpage"
          className="navlink"
          activeClassName="active-navlink"
        >
          CART
        </NavLink>
        {user && ( //Renderas endast om user finns
          <NavLink
            to="/favoritepage"
            className="navlink"
            activeClassName="active-navlink"
          >
            FAVORITES
          </NavLink>
        )}
        <NavLink to="/" className="navlink" activeClassName="active-navlink">
          HOME
        </NavLink>
      </div>
      <NavLink
        to={user ? "/" : "/signinpage"}
        className="navlink"
        activeClassName="active-navlink"
      >
        <button className="sign-in" onClick={buttonAction}>
          {buttonText}
        </button>
      </NavLink>
    </div>
  );
}

export default NavBar;
