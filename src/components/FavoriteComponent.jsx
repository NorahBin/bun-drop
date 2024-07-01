import React, { useState, useEffect } from "react";
import stripes from "../images/stripes.png";
import stripespng from "../images/stripespng.png";



function FavoriteComponent({ userId }) {

  //State variabel för att lagra favoriter
  const [favorites, setFavorites] = useState([]);

  //Använder useffect för att uppdatera favoriter baserat på userId
  useEffect(() => {

    //hämtar favoriter från localStorage eller skapar ett tomt objekt om det inte finns någon
    const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setFavorites(allFavorites[userId] || []);
  }, [userId]); //Körst varje gång userId ändras


  //Funktion för att ta bort e ttfavorit item
  const handleRemove = (itemId) => {

    //Hämtar alla favoriter från local storage
    const allFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    //Hämtar favoriter för den inloggade användaren
    const userFavorites = allFavorites[userId] || [];

    //Filtrerar bort favoriten som ska tas bort
    const updatedFavorites = userFavorites.filter((item) => item.id !== itemId);

    //Upptadetar favoriter i localstorage
    allFavorites[userId] = updatedFavorites;
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
   //Uppdaterar state-variabeln med de nya favoriterna
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <div className="favorite-container">
        <h1 className="favorite-title">
          Favorites{" "}
          <img src={stripespng} alt="Stripes" className="stripespng-image" />
          {/* <img src={stripes} alt="Stripes" className="stripes-image" /> */}
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

