import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/Navbar";
import LandingPageComp from "./components/LandingPageComp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";


function App() {
  return (
    <>
      <Router>
        <>
          <NavBar />
        </>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menupage" element={<MenuPage />} />
          <Route path="/cartpage" element={<CartPage />} />
        </Routes>
      </Router>

      {/* <LandingPageComp /> */}
    </>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import NavBar from './components/Navbar'
// import LandingPageComp from './components/LandingPageComp'

// function App() {

//   return (
//     <>

//     <NavBar/>
//     <LandingPageComp/>
//     </>
//   )
// }

// export default App
