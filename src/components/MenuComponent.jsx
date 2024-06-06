import React from "react";
import { GiHamburger } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { GiFrenchFries } from "react-icons/gi";
import { IoIosIceCream } from "react-icons/io";

function MenuComponent() {
  return (
    <>
      <div className="menu-container">
        <div className="red-menu">
          <div className="menu-text-container">
            <h1 className="all-text">All</h1>
            <span className="white-line"></span>

            <h1 className="burger-text">Burgers</h1>
            <GiHamburger className="hamburger-icon" />

            <span className="white-line"></span>
            <h1>Sides</h1>
            <GiFrenchFries className="sides-icon" />

            <span className="white-line"></span>

            <h1>Drink</h1>
            <RiDrinks2Fill className="drink-icon" />

            <span className="white-line"></span>
            <h1>Desserts</h1>
            <IoIosIceCream className="dessert-icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuComponent;

// import React from "react";
// import { GiHamburger } from "react-icons/gi";
// import { RiDrinks2Fill } from "react-icons/ri";
// import { CiFries } from "react-icons/ci";
// import { GiFrenchFries } from "react-icons/gi";
// import { IoIosIceCream } from "react-icons/io";

// function MenuComponent() {
//     return (
//       <>
//         <div className="menu-container">
//           <div className="red-menu">
//             <div className="menu-text-container">
//               <h1 className="burger-text">Burgers</h1>
//               <GiHamburger className="hamburger-icon" />

//               <span className="white-line"></span>
//               <h1>Sides</h1>
//               <GiFrenchFries className="sides-icon" />

//               <span className="white-line"></span>

//               <h1>Drink</h1>
//               <RiDrinks2Fill className="drink-icon" />

//               <span className="white-line"></span>
//                 <h1>Desserts</h1>
//                 <IoIosIceCream className="dessert-icon" />
//             </div>
//           </div>
//         </div>
//       </>
//     );
// }

// export default MenuComponent;
