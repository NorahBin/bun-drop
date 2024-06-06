import { FaArrowLeft } from "react-icons/fa";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import React, { useState, useEffect } from "react";
import LandingPageCards from "./LandingPageCards";
import menuData from "/menu.json"; // Assuming menu.json is in the same directory
import stripes from "../images/stripes.png";

function LandingPageComponent() {
  const [startIndex, setStartIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1); // Initialize activeIndex to 1

  const totalItems = menuData.mostPopular.length;
  const itemsPerPage = 3;

  const handleNextClick = () => {
    if (startIndex + itemsPerPage < totalItems) {
      setStartIndex((prevIndex) => prevIndex + itemsPerPage);
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - itemsPerPage));
    setActiveIndex((prevIndex) => Math.max(1, prevIndex - 1)); // Ensure activeIndex doesn't go below 1
  };

  return (
    <>
      <div className="most-popular-container">
        <h2 className="most-popular-text">
          Most Popular{" "}
          <img src={stripes} alt="Stripes" className="stripes-image" />
        </h2>
        <div className="red-line-most-popular"></div>
      </div>

      <div className="landing-page-container">
        <button
          className="arrow left-arrow previous-button"
          onClick={handlePreviousClick}
          disabled={startIndex === 0} // Disable the button if at the start
        >
          <TbArrowBigLeftFilled className="arrow-icon" />
        </button>
        <button
          className="arrow right-arrow next-button"
          onClick={handleNextClick}
          disabled={startIndex + itemsPerPage >= totalItems} // Disable the button if at the end
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
                activeIndex === index + 1 ? "active" : ""
              }`}
            ></div>
          )
        )}
      </div>
    </>
  );
}

export default LandingPageComponent;
