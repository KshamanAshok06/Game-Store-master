import { useContext } from "react";
import { ReactComponent as HamBtn } from "../../assets/ham.svg";
import { ReactComponent as CrossBtn } from "../../assets/cross.svg";
import { MainContext } from "../../Context/MainContext";
import Menubar from "./Menubar";
import StoreLogo from "../../assets/store-logo.png";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { isMenuOpen, toggleMenu } = useContext(MainContext);
  const currLocation = useLocation();

  const links = [
    { to: "about", name: "About", id: "l1" },
    { to: "store", name: "Store", id: "l2" },
    { to: "wishlist", name: "Wishlist", id: "l3" },
    { to: "cart", name: "Cart", id: "l4" },
    { to: "login", name: "Login", id: "l5" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="w-full bg-black xs:px-4">
        <div className="relative m-auto xs:flex xs:justify-between flex items-center">
          <div className="relative z-[9999] flex h-16 justify-center">
            <div className="m-auto" role="banner">
              <Link to={`/about`}>
                <img
                  src={StoreLogo}
                  alt="Game Store Logo"
                  className="m-auto w-40"
                />
              </Link>
            </div>
            <div
              className="absolute right-0 my-auto mr-2 translate-y-2/4 cursor-pointer space-y-1.5 xs:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <CrossBtn /> : <HamBtn />}
            </div>
          </div>
          <Menubar
            links={links}
            showCategory={currLocation.pathname == "/store"}
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
