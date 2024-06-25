import React, { useState, useEffect } from "react";
import menuData from "/menu.json"; 


function LandingPageCards({ startIndex }) { //tar emot startIndex som en prop

  //State variabler för att hålla koll på menu items som ska visas, sätter den till en empty array
  const [menuItems, setMenuItems] = useState([]);


  //Use effect hook för att uppdatera menu items när startIndex ändras
  useEffect(() => {

    //Kalkylerar endIndex baserat på start index och antalet items i menu.json
    const endIndex = Math.min(startIndex + 3, menuData.mostPopular.length);

    //Slice:a mostpopular array  baserat på start index och end index, för att hämta items som ska displayas
    setMenuItems(menuData.mostPopular.slice(startIndex, endIndex));
  }, [startIndex]); //Denna effekt körs varje gång startIndex proppen ändras

  return (
    <>
      <div className="card-container">
        {menuItems.map((item) => (
          // Måste ha en key för att kunna rendera en lista av elements i react
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


