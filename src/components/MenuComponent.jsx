

import React, { useState, useEffect } from "react";
import { GiHamburger } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { GiFrenchFries } from "react-icons/gi";
import { IoIosIceCream } from "react-icons/io";

function MenuComponent({ user }) {

  //State variabler
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [activeButton, setActiveButton] = useState("all");

  //Fetchar menuitems
  useEffect(() => {
    fetch("http://localhost:3000/menu") //Hämtar menu items från url
      .then((response) => response.json()) //Parsar response till json
      .then((data) => setMenuItems(data)) //Uppdaterar menuitems state med hämtad data
      .catch((error) => console.error("Error:", error));
  }, []); //Kommer endast köra en gång med en tom dependency arrat

  //Funktion för att lägga till ett item i favorites lista
  const addToFavorites = (item) => {

    //Hämtar user id från user objektet
    const userId = user.id;

    //Hämtar existerande favoriteslist från local storage och parse:ar det, eller skapar en nytt tomt objekt
    let favorites = JSON.parse(localStorage.getItem("favorites")) || {};

    //Om user inte har en favorites lista,, skapa en ny array
    if (!favorites[userId]) {
      favorites[userId] = [];
    }

    // Kolla om item redan finns i favoritelistan
    const isItemInFavorites = favorites[userId].some(
      (favoriteItem) => favoriteItem.id === item.id
    );

    //Om item:et inte redan finns i favorites listan, lägg till det
    if (!isItemInFavorites) {
      favorites[userId].push(item);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    else {

      console.log("Item is already in favorites");
    }
  };

  const handleFilterClick = (filter, button) => {
    setFilter(filter);
    setActiveButton(button);
  };

const addToCart = (item) => {

  //Hämtar user id.
  const userId = user?.id;

//Hämtar existerande cart objekt från local storage och parsa det till ett javasvript objekt, eller skapa ett nytt objekt
  let carts = JSON.parse(localStorage.getItem("carts")) || {};

  //Cart key som ska användas antingen user id eller "tempuser"
  const cartKey = userId || "tempUser";

  //Hämta users cart från carts objeket, elelr skapa en ny empte array
  let userCart = carts[cartKey] || [];

  //Hitta index på item:et i userns cart om det redan finns
  const existingItemIndex = userCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  //Om item:et redan finns, öka kvantiteten
  if (existingItemIndex > -1) {
    userCart[existingItemIndex].quantity += 1;
  }
  else {
//Om det inte finns, lägg till kvantitenten 1
    userCart.push({ ...item, quantity: 1 });
  }

  //Uppdatera userns cart i carts objektet
  carts[cartKey] = userCart;

  //Spara det uppdaterade carts objektet til local storage, converterar det till en json string
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
                  <button className="add-to-favorites-button" onClick={() => addToFavorites(item)}>
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
