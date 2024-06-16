import React, { useState, useEffect } from "react";
import stripes from "../images/stripes.png";

function FavoriteComponent({ userId }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(allFavorites[userId] || []);
  }, [userId]);

  const handleRemove = (itemId) => {
    const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavorites = allFavorites[userId] || [];
    const updatedFavorites = userFavorites.filter((item) => item.id !== itemId);

    allFavorites[userId] = updatedFavorites;
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <div className="favorite-container">
        <h1 className="favorite-title">
          Favorites{" "}
          <img src={stripes} alt="Stripes" className="stripes-image" />
        </h1>
        <div className="favorite-title-red-line"></div>
      </div>

      <div className="favorite-card-container">
        {favorites.map((item, index) => (
          <div key={index} className="favorite-card">
            <img
              src={item.image}
              alt={item.title}
              className="favorite-burger-pic"
            />
            <h1 className="favorite-card-text">{item.title}</h1>
            <div className="favorite-red-line"></div>
            <h2>{item.name}</h2>
            <p className="favorite-description">{item.description}</p>
            <div className="favorite-price-container">
              <p className="favorite-price-text">Price: </p>
              <p className="favorite-price">{item.price}</p>
            </div>
            <button
              className="favorite-remove-button"
              onClick={() => handleRemove(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default FavoriteComponent;

