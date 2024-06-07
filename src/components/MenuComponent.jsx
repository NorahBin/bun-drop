import React, { useState, useEffect } from "react";
import { GiHamburger } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { GiFrenchFries } from "react-icons/gi";
import { IoIosIceCream } from "react-icons/io";

function MenuComponent() {
  const [menuItems, setMenuItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("http://localhost:3000/menu") 
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleFilterClick = (filter) => {
    setFilter(filter);
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
              className="all-text all-button"
              onClick={() => handleFilterClick("all")}
            >
              All
            </button>
            <span className="white-line"></span>

            <button
              className="burger-text all-button"
              onClick={() => handleFilterClick("burgers")}
            >
              Burgers
              <GiHamburger className="hamburger-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className="all-button"
              onClick={() => handleFilterClick("sides")}
            >
              Sides
              <GiFrenchFries className="sides-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className="all-button"
              onClick={() => handleFilterClick("drinks")}
            >
              Drinks
              <RiDrinks2Fill className="drink-icon" />
            </button>
            <span className="white-line"></span>

            <button
              className="all-button"
              onClick={() => handleFilterClick("desserts")}
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
                <button className="sign-in order-button">Order</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuComponent;

