import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import reactLogo from "../assets/reactLogo.svg";
import reactRouterLogo from "../assets/reactRouterLogo.svg";
import tailwindLogo from "../assets/tailwindLogo.svg";
import AnimatedPage from "../components/AnimatedPage";
import axios from "axios"


function Register() {
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

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("role");

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("role");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(username, email, password, confirmPassword);
    await axios.post("http://localhost:4000/register", {
      username, email, password, confirmPassword
    }).then((res) => {
      console.log('Hello')
      navigate('/store')
      alert('register successfull')
    }).catch((err) => console.log(err))
    clearForm();
  };

  return (
    <AnimatedPage>
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-4">

        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div id="Reg-container" class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="light" />
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Register
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgba(255,170,106,0.86)] focus:outline-none"placeholder="name@company.com" required=""></input>
                </div>
                <div>
                  <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                  <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username"         className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgba(255,170,106,0.86)] focus:outline-none"placeholder="Username" required=""></input>
                </div>
                <div>
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••"         className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgba(255,170,106,0.86)] focus:outline-none"required=""></input>
                </div>
                <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"         className="h-10 w-full cursor-default rounded-md border border-neutral-800 bg-neutral-950 p-3.5 text-slate-100 transition-colors  duration-500 placeholder:select-none placeholder:text-neutral-500 focus:border-[rgba(255,170,106,0.86)] focus:outline-none"required=""></input>
                </div>
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""></input>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
                </div>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a href="login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
                <input type="Button" onClick={handleSubmit} value="Register" className="border border-neonPink px-5 py-3 font-heading text-dynamicText font-bold text-neonPink duration-500 hover:bg-neonPink hover:text-white" />

              </form>
            </div>
          </div>
        </div>

      </div>
      <style jsx>{`
          #Reg-container {
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

        #Reg-container:hover .light:before {
          box-shadow: 0 0 80px 30px #ff8000;
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
          box-shadow: 0 0 60px 10px #ff8000;
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

    </AnimatedPage>
  );
}

export default Register;

