import React, { useState, useEffect } from "react";
import { GiHamburger } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { GiFrenchFries } from "react-icons/gi";
import { IoIosIceCream } from "react-icons/io";

function MenuComponent({ user }) {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const addToFavorites = (item) => {
    const userId = user.id;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

    if (!favorites[userId]) {
      favorites[userId] = [];
    }

    // Kolla om item redan finns i favorite
    const isItemInFavorites = favorites[userId].some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    if (!isItemInFavorites) {
      favorites[userId].push(item);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      // Optionally, alert the user that the item is already in favorites
      console.log("Item is already in favorites");
    }
  };

  const handleFilterClick = (filter, button) => {
    setFilter(filter);
    setActiveButton(button);
  };

const addToCart = (item) => {
  const userId = user?.id;
  let carts = JSON.parse(localStorage.getItem("carts")) || {};
  const cartKey = userId || "tempUser";
  let userCart = carts[cartKey] || [];

  const existingItemIndex = userCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    userCart[existingItemIndex].quantity += 1;
  } else {
    userCart.push({ ...item, quantity: 1 });
  }

  carts[cartKey] = userCart;
  localStorage.setItem("carts", JSON.stringify(carts));

  // Update userOrderCart
  let userOrderCarts = JSON.parse(localStorage.getItem("userOrderCarts")) || {};
  userOrderCarts[cartKey] = userCart;
  localStorage.setItem("userOrderCarts", JSON.stringify(userOrderCarts));
};


  const filteredItems = menuItems.filter((item) => {
    if (filter === "all") return true;
    return item.category === filter;
  });

  return (
    <>
      <div className="menu-container">
        <div className="red-menu">
          <div className="menu-text-container">
            <button
              className={`all-text menu-all-button ${
                activeButton === "all" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("all", "all")}
            >
              All
            </button>
            <span className="white-line"></span>

            <button
              className={`burger-text menu-burger-button ${
                activeButton === "burgers" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("burgers", "burgers")}
            >
              Burgers
            </button>
            <GiHamburger className="hamburger-icon" />

            <span className="white-line"></span>

            <button
              className={`menu-sides-button ${
                activeButton === "sides" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("sides", "sides")}
            >
              Sides
            </button>
            <GiFrenchFries className="sides-icon" />

            <span className="white-line"></span>

            <button
              className={`menu-drink-button ${
                activeButton === "drinks" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("drinks", "drinks")}
            >
              Drinks
            </button>
            <RiDrinks2Fill className="drink-icon" />

            <span className="white-line"></span>

            <button
              className={`menu-dessert-button ${
                activeButton === "desserts" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("desserts", "desserts")}
            >
              Desserts
            </button>
            <IoIosIceCream className="dessert-icon" />
          </div>
          <div className="menu-card-container">
            {filteredItems.map((item, index) => (
              <div key={index} className="menu-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="menu-burger-pic"
                />
                <h2>{item.name}</h2>
                <h1 className="menu-text-title">{item.title}</h1>
                <div className="menu-red-line"></div>
                <p className="menu-description">{item.description}</p>
                <div className="menu-price-container">
                  <p className="menu-price-text">Price: </p>
                  <p className="menu-price">{item.price}$</p>
                </div>
                <button
                  className="menu-order-button "
                  onClick={() => addToCart(item)}
                >
                  Order
                </button>

                {user && (
                  <button onClick={() => addToFavorites(item)}>
                    Add to favorites
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuComponent;

