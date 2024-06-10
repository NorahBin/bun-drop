

import bundrop from "../images/bundrop.png";
import { NavLink } from "react-router-dom";

function NavBar() {
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
          <h2 className="cart-text">ABOUT US</h2>
        </div>
        <NavLink to="/signinpage">
          <button className="sign-in">Sign In</button>
        </NavLink>
        <NavLink to="/signuppage">
          <button className="sign-in">Sign up</button>
        </NavLink>
      </div>
      <div className="navbar-underline"></div>
    </>
  );
}

export default NavBar;

