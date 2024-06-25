import { TbArrowBigRightFilled } from "react-icons/tb";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import React, { useState, useEffect } from "react"; //Importeras usestate hook från react
import LandingPageCards from "./LandingPageCards";
import menuData from "/menu.json";
import stripespng from "../images/stripespng.png";

function LandingPageComponent() {

  //State variabler för att hålla koll på start index och active index
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1); // Sätter start index till 1


  //Hämtar alla items från json server och sätter 3 items per page
  const totalItems = menuData.mostPopular.length;
  const itemsPerPage = 3;

  //Funktion för att hantera när användare klickar på next button
  const handleNextClick = () => {
    //Kollar om start index plus itemsperpage är mindre än total ite,s
    if (startIndex + itemsPerPage < totalItems) {

      //Om det är det, öka start indext med antalet objekt per sida
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);

      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousClick = () => {

    //Minskar start index med 3 objekt per sida men låter det aldrig gå under 0
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));

    //Minskar det aktiva indexet med 1 men låter det aldrig gå under 1.
    setActiveIndex((prevIndex) => Math.max(1, prevIndex - 1)); 
  };

  return (
    <>
      <div className="most-popular-container">
        <h2 className="most-popular-text">
          Most Popular{" "}
          <img src={stripespng} alt="Stripes" className="stripespng-image" />
        </h2>
        <div className="red-line-most-popular"></div>
      </div>

      <div className="landing-page-container">
        <button
          className="arrow left-arrow previous-button"
          onClick={handlePreviousClick}
          disabled={startIndex === 0} // Disable knappen om den är i början av slide showen
        >
          <TbArrowBigLeftFilled className="arrow-icon" />
        </button>
        <button
          className="arrow right-arrow next-button"
          onClick={handleNextClick}
          disabled={startIndex + itemsPerPage >= totalItems} // Disable knappen om den är i slutet av slide showen
        >
          <TbArrowBigRightFilled className="arrow-icon" />
        </button>
        <div>
          <LandingPageCards startIndex={startIndex} />
        </div>
      </div>
      <div className="circle-container">
        {[...Array(Math.ceil(totalItems / itemsPerPage)).keys()].map(
          (index) => (
            <div
              key={index}
              className={`image-circles circle ${
                activeIndex === index + 1 ? "active" : "" // "" sätts om om condition är false, alltså ingen klass(fallback value)
              }`}
            ></div>
          )
        )}
      </div>
    </>
  );
}

export default LandingPageComponent;

