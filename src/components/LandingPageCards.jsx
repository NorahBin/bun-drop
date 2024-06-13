import React, { useState, useEffect } from "react";
import menuData from "/menu.json"; // Assuming menu.json is in the same directory

function LandingPageCards({ startIndex }) {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Slice the items based on the startIndex and display the next three items
    const endIndex = Math.min(startIndex + 3, menuData.mostPopular.length);
    setMenuItems(menuData.mostPopular.slice(startIndex, endIndex));
  }, [startIndex]);

  return (
    <>
      <div className="card-container">
        {menuItems.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.image} alt={item.title} className="burger-pic" />
            <h1 className="landing-page-card-text">{item.title}</h1>
            <div className="landing-page-red-line"></div>
            <p className="landing-page-description-text">{item.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default LandingPageCards;


