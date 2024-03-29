import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MainContext } from "../Context/MainContext";
import heartEmpty from "../assets/heartEmpty.svg";
import heartFilled from "../assets/heartFilled.svg";
import { useIsSmall } from "./../Utils/constants";
import { numberToRupees } from "../Utils/utils";
import LoaderAnim from "./LoaderAnim";
import CardSpotlightEffect from "../Pages/Cardeffect";

const Card = ({ game, toggleFavourite }) => {
  const { isMenuOpen, cart, addToCart } = useContext(MainContext);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isSmall = useIsSmall();

  function getRatingColor() {
    if (game.rating > 4.1) {
      return "bg-best";
    } else if (game.rating > 3.1) {
      return "bg-bad";
    } else {
      return "bg-worst";
    }
  }


  const storeEffect = {
    menuOpened: {
      scale: 0.9,
      transition: {
        type: "tween",
      },
    },
    menuClosed: {
      scale: 1,
      transition: {
        type: "tween",
      },
    },

  };

  return (



    <motion.section
      id="card"
      key={game.id}
      animate={isMenuOpen && isSmall ? "menuOpened" : "menuClosed"}
      variants={storeEffect}
      whileHover={{
        scale: 1.02,
        cursor: "pointer",
        backgroundColor: "hsl(0, 0%, 10%)",
        boxShadow: "0 0 10px hsl(0, 0%, 20%)",
      }}
      whileTap={{ scale: 1.012 }}
      className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] relative max-w-md overflow-hidden rounded-xl border border-slate-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat  shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] "
    >

      {!isImageLoaded && (
        <div className="flex h-24 items-center justify-center">
          <LoaderAnim />
        </div>
      )}

      <figure>
        <img
          src={game.pictures.banner}
          alt="Game Cover photo"
          className="rounded-t-lg"
          loading="lazy"
          onLoad={() => {
            setIsImageLoaded(true);
          }}
        />
      </figure>
      <div className="light">
        <div className="mt-2 p-2 text-lightText">
          <div className="flex-col justify-between ">
            <div className="flex min-h-[4rem] justify-between">
              <p className="line-clamp-2 h-fit text-dynamic font-bold">
                {game.name}
              </p>
              <p
                className={`flex max-h-7 items-center rounded-lg px-2 font-semibold ${getRatingColor()}`}
              >
                {game.rating}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <span>{numberToRupees(game.price)}</span>
              <div className="flex items-center gap-1" >
                <button className="m-2" onClick={toggleFavourite} role="button">
                  <img
                    src={game.isFavorite ? heartFilled : heartEmpty}
                    alt="Wishlist Icon"
                    id={game.id}
                    className={`w-8 select-none duration-300 ${game.isFavorite || `hover:drop-shadow-4xl`
                      }`}
                  />
                </button>
                <button
                  role="button"
                  className={`rounded-lg border px-2 py-1 text-sm font-medium duration-300 hover:text-darkBg2 xs:text-base ${cart.includes(game.id)
                    ? `border-success text-success hover:bg-success`
                    : `border-darkHover text-darkHover hover:bg-darkHover`
                    }`}
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(game.id, game.price);
                  }}
                >
                  {cart.includes(game.id) ? "Added" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div >

    </motion.section>


  );
};

Card.propTypes = {
  game: PropTypes.object,
  toggleFavourite: PropTypes.func,
};

export default Card;
