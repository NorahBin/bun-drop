import { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
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
  //State variabel för user och en funktion för att uppdatera variabeln
  //Håller koll på signed in user
  const [user, setUser] = useState(null);

    useEffect(() => {
        
      //Hämtar  användar data för sparad user från local storage.
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.stringify(savedUser));
      }
    }, []);  //Empty dependency array så att den endast kör en gång när appen mountas

  return (
    <>
      <Router>
        <>
          {/* //Passar username som en prop till navbar */}
          {/*  renderas inuti router så att den kan visas på alla sidor */}
          <NavBar user={user} setUser={setUser} />
        </>
        <Routes>

          {/* Path prop vilket är url, och element prop vilket är komponenten som ska renderas för den routen*/}
          <Route path="/" element={<LandingPage />} />
          <Route path="/menupage" element={<MenuPage user={user} />} />

          <Route path="/cartpage" element={<CartPage user={user} />} />

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

