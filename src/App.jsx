import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavBar from "./components/Navbar";
import LandingPageComp from "./components/LandingPageComp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <>
          <NavBar />
        </>
        <Routes></Routes>
      </Router>

      <LandingPageComp />
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
