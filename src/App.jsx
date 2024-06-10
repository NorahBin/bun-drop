

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
import CheckoutPage from "./pages/CheckoutPage";
import ConformationPage from "./pages/ConformationPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

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
          <Route path="/checkoutpage" element={<CheckoutPage />} />
          <Route path="/conformationpage" element={<ConformationPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/signinpage" element={<SignInPage />} />
        </Routes>
      </Router>

      {/* <LandingPageComp /> */}
    </>
  );
}

export default App;
