import { Link, Navigate, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import reactLogo from "../assets/reactLogo.svg";
import reactRouterLogo from "../assets/reactRouterLogo.svg";
import tailwindLogo from "../assets/tailwindLogo.svg";
import AnimatedPage from "../components/AnimatedPage";
import axios from "axios"
import CardSpotlightEffect from "./Cardeffect";
function Login() {
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

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const navigateRegister = () => {
    // 👇️ navigate to /
    navigate('/register');
  };

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    await axios.post("http://localhost:4000/login", {
      username, password
    }).then((res) => {
      console.log(res.data)
      navigate('/store');
      alert('login success')
    }).catch((err) => console.log(err))

    // var { uname, pass } = document.forms[0];

    // // Find user login info
    // const userData = database.find((user) => user.username === uname.value);

    // // Compare user info
    // if (userData) {
    //   if (userData.password !== pass.value) {
    //     // Invalid password
    //     setErrorMessages({ name: "pass", message: errors.pass });
    //   } else {
    //     setIsSubmitted(true);
    //     navigate('/store')
    //   }
    // } else {
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };


  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  // JSX code for login form
  const renderForm = (

    <div id="Form_container" className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="light" />
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          LOGIN
        </h1>

        <form onSubmit={handleSubmit} >

          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="uname" className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none" placeholder="Username" required=""></input>
          </div>
          {renderErrorMessage("uname")}

          <div >
            <label for="pass" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="pass" placeholder="••••••••" className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgb(207_174_255)] focus:outline-none" required=""></input>
            {renderErrorMessage("pass")}
          </div>
          <div className="flex space-x-4 my-6 ">

            <input type="submit" className="border border-neonPink px-5 py-3 font-heading text-dynamicText font-bold text-neonPink duration-500 hover:bg-neonPink hover:text-white" />
            <style jsx>{`
          #Form_container {
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

        #Form_container:hover .light:before {
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

            <input type="Button" onClick={navigateRegister} value="Register" className="border border-neonPink px-5 py-3 font-heading text-dynamicText font-bold text-neonPink duration-500 hover:bg-neonPink hover:text-white" />


          </div>
        </form>



      </div>
    </div>

  );



  return (

    <AnimatedPage>

      <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">
        <div className="app">
          <div className="login-form">
            {isSubmitted ? '' : renderForm}
          </div>
        </div>



      </div>

    </AnimatedPage>


  );
}

export default Login;

