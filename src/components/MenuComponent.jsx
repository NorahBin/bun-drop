

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

    // Check if the item is already in the favorites
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
  // Kollar om det finns en signed in user
  const userId = user?.id;

  // Hämtar carts från lokal storage, annats initialisera en ny. 
  let carts = JSON.parse(localStorage.getItem("carts")) || {};

  // Bestäm cart key baserat på user id eller om det är temp user
  const cartKey = userId || "tempUser";

  // Hämtar users cars eller temporary cart 
  let userCart = carts[cartKey] || [];

  // Kollar om itemet redan finns i carten
  const existingItemIndex = userCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    // Om det finns en, öka kvantiteten
    userCart[existingItemIndex].quantity += 1;
  } else {
    // Annats lägg till varan
    userCart.push({ ...item, quantity: 1 });
  }

  // Uppdaterar carts objektet med det nya user carts 
  carts[cartKey] = userCart;
  localStorage.setItem("carts", JSON.stringify(carts));
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
              className={`all-text all-button ${
                activeButton === "all" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("all", "all")}
            >
              All
            </button>
            <span className="white-line"></span>

            <button
              className={`burger-text all-button ${
                activeButton === "burgers" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("burgers", "burgers")}
            >
              Burgers
              <GiHamburger className="hamburger-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className={`all-button ${
                activeButton === "sides" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("sides", "sides")}
            >
              Sides
              <GiFrenchFries className="sides-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className={`all-button ${
                activeButton === "drinks" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("drinks", "drinks")}
            >
              Drinks
              <RiDrinks2Fill className="drink-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className={`all-button ${
                activeButton === "desserts" ? "yellow-active" : ""
              }`}
              onClick={() => handleFilterClick("desserts", "desserts")}
            >
              Desserts
              <IoIosIceCream className="dessert-icon" />
            </button>
          </div>
          <div className="menu-card-container">
            {filteredItems.map((item, index) => (
              <div key={index} className="menu-card">
                <img src={item.image} alt={item.title} className="burger-pic" />
                <h1 className="card-text">{item.title}</h1>
                <div className="red-line"></div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <button
                  className="sign-in order-button"
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
