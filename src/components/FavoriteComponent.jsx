import React, { useState, useEffect } from "react";

function FavoriteComponent() {
      const [favorites, setFavorites] = useState([]);

      useEffect(() => {
        setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
      }, []);
    
    return (
      <>
        {" "}
        <h1>Favorites</h1>
        <div className="menu-card-container">
          {favorites.map((item, index) => (
            <div key={index} className="menu-card">
              <img src={item.image} alt={item.title} className="burger-pic" />
              <h1 className="card-text">{item.title}</h1>
              <div className="red-line"></div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
        
      </>
    );
}

export default FavoriteComponent;

// import React from 'react';
// function FavoriteComponent() {
//     return ( <><h1>Favorite Component</h1></> );
// }

// export default FavoriteComponent;
