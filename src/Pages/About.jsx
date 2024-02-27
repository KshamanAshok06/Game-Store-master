import React from 'react';
import { Link } from "react-router-dom";
import reactLogo from "../assets/reactLogo.svg";
import reactRouterLogo from "../assets/reactRouterLogo.svg";
import tailwindLogo from "../assets/tailwindLogo.svg";
import AnimatedPage from "../components/AnimatedPage";
import githubLogo from "../assets/githubLogo.svg";
import CardSpotlightEffect from "./Cardeffect"; // Assuming this is the correct path

function About() {
  const frameworkLogos = [
    { logo: reactLogo, name: "ReactJS", alt: "React Logo" },
    { logo: reactRouterLogo, name: "React Router", alt: "React Router Logo" },
    { logo: tailwindLogo, name: "TailwindCSS", alt: "TailwindCSS Logo" },
  ];

  const frameworks = frameworkLogos.map((item) => (
    <div
      key={item.logo + item.name}
      className="m-auto rounded-lg p-2 duration-500 hover:cursor-pointer hover:bg-darkBg2"
    >
      <img src={item.logo} alt={item.alt} className="m-auto w-28" />
      <p className="text-center text-lightText">{item.name}</p>
    </div>
  ));

  return (
    <AnimatedPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
        {/* Existing background gradient div */}
        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

        {/* Wrap the content with CardSpotlightEffect */}

        <section>
          {/* Your existing content about the game store */}

         

            <h1  className="font-heading text-dynamicHeading font-black text-white">
              Welcome to our Game Store!🎮
            </h1>
          
          <article className="text-dynamicText text-lightText">

            {/* ...rest of your content */}
            <p className="mb-4 mt-6 max-w-4xl  ">
              Step into a world of limitless gaming possibilities and immerse
              yourself in thrilling adventures. Whether you&#39;re a casual
              player or a die-hard gamer, we&#39;ve got you covered with a
              vast collection of games for all platforms. Join us on this
              gaming journey at unbeatable prices, only at our Game Store.
              Your gaming dreams are just a click away!
            </p>
          </article>
          <>
            <Link to="/store">
              <button>
                <div className="light" />
                OPEN STORE
              </button>
            </Link>
            <style jsx>{`
        button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.25rem;
          border-radius: 0.375rem;
          background-color: #111111;
          color: #eeeeee;
        }

        button:hover .light:before {
          box-shadow: 0 0 80px 30px #4338ca;
          opacity: 0.8;
        }

        .light {
          z-index: -1;
        }

        .light:before {
          border-radius: 0.375rem;
          transition: 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
          content: "";
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          transform: scale(1);
          animation: flickering-light 4s infinite;
          box-shadow: 0 0 60px 10px #4338ca;
          opacity: 0.4;
        }

        @keyframes flickering-light {
          0% {
            opacity: 0.8;
          }
          3% {
            opacity: 0.4;
          }
          5% {
            opacity: 0.8;
          }
          15% {
            opacity: 0.4;
          }
          100% {
            opacity: 0.4;
          }
        }
       
      `}</style>
          </>
          { /* <div className="flex w-full items-center gap-4">
              <Link to="/store" role="button" className="border border-neonPink px-5 py-3 font-heading text-dynamicText font-bold text-neonPink duration-500 hover:bg-neonPink hover:text-white">
                OPEN STORE
              </Link>
            </div>
      */}

        </section>


      </div>
    </AnimatedPage>
  );
}

export default About;
