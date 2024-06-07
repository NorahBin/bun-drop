

import React, { useState, useEffect } from "react";

function MenuCardsComponent() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="menu-card-container">
      {menuItems.map((item, index) => (
        <div key={index} className="menu-card">
          {/* Display your item properties here */}
          <img src={item.image} alt={item.title} className="burger-pic" />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>

  );
}

export default MenuCardsComponent;
