import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import games from "./Utils/games";
import Store from "./Pages/Store";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar/Navbar";
import { useContext } from "react";
import { MainContext } from "./Context/MainContext";
import GameDetail from "./Pages/GameDetail/GameDetail";
import Footer from "./components/Footer";
import About from "./Pages/About";
import { AnimatePresence } from "framer-motion";
import RedirectToAbout from "./components/RedirectToAbout";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Card from "./Pages/Cardeffect";
import TextTypingEffectWithTextsFadeOut from "./components/ButtonEffect";
import InputBorderSpotlight from "./components/Input_Border_Spotlight";
import PaymentCard from "./Pages/react-fancy-payment-page-main/src/main";
import PaymentStatusCard from "./Pages/Paysucces";
function App() {
  const [gamesList, setGamesList] = useState(games);
  const { isMenuOpen, toggleMenu } = useContext(MainContext);
  const location = useLocation();

  function toggleFavourite(e) {
    e.preventDefault();
    setGamesList((prevList) =>
      prevList.map((game) => ({
        ...game,
        isFavorite:
          game.id === e.target.id ? !game.isFavorite : game.isFavorite,
      }))
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-blackGradient">
        <div
          className={`${!isMenuOpen && `hidden`
            } fixed z-30 min-h-screen w-screen bg-semiDarker xs:hidden`}
          onClick={toggleMenu}
        ></div>
        <AnimatePresence initial={false} mode="wait">
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<RedirectToAbout />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Cardeffect" element={< Card />} />
            <Route path="/ButtonShadowSpotlight" element={<TextTypingEffectWithTextsFadeOut />} />
            <Route path="/InputBorderSpotlight" element={<InputBorderSpotlight />} />
            <Route path="/PaymentCard" element={<PaymentCard />} />
            <Route path="/PaymentStatusCard" element={<PaymentStatusCard />} />



            <Route
              exact
              path="/store"
              element={
                <Store
                  gamesList={gamesList}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/store/:id"
              element={
                <GameDetail
                  gamesList={gamesList}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/wishlist"
              element={
                <Wishlist
                  gamesList={gamesList}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route path="/cart" element={<Cart gamesList={gamesList} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
