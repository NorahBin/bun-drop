

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
import FavoritePage from "./pages/FavoritePage";

function App() {
  //Variabel för att hålla koll på signed-in user
  const [user, setUser] = useState(null);

  return (
    <>
      <Router>
        <>
          {/* //Passar username som en prop till navbar */}
          <NavBar user={user} setUser={setUser} />
        </>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menupage" element={<MenuPage user={user} />} />

          <Route path="/cartpage" element={<CartPage user={user} />} />
          {/* <Route path="/favoritepage" element={<FavoritePage />} /> */}

          <Route path="/favoritepage" element={<FavoritePage user={user} />} />

          <Route path="/checkoutpage" element={<CheckoutPage user={user} />} />
          <Route
            path="/conformationpage"
            element={<ConformationPage user={user} />}
          />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route
            path="/signinpage"
            element={<SignInPage setUser={setUser} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
