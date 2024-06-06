import bundrop from "../images/bundrop.png";

function NavBar() {
  return (
    <>
      <div className="navbar">
        <img src={bundrop} alt="Logo" className="navbar-logo" />
        <div className="flexbox navbar-text">
          <h2 className="menu-text"> MENU</h2>
          <h2 className="cart-text"> CART</h2>
          <h2 className="cart-text"> ABOUT US</h2>
        </div>
        <button className="sign-in">Sign In</button>
        
      </div>
      <div className="navbar-underline"></div> {/* Add this line */}
    </>
  );
}

export default NavBar;
