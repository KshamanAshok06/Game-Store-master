import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import reactLogo from "../assets/reactLogo.svg";
import reactRouterLogo from "../assets/reactRouterLogo.svg";
import tailwindLogo from "../assets/tailwindLogo.svg";
import AnimatedPage from "../components/AnimatedPage";
import axios from "axios"
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

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


  // JSX code for login form
  const renderForm = (


    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">


        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          LOGIN
        </h1>

        <form onSubmit={handleSubmit} >

          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
            <input onChange={(e) => setUsername(e.target.value)} type="text" name="uname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required=""></input>
          </div>
          {renderErrorMessage("uname")}

          <div >
            <label for="pass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-4">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="pass" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></input>
            {renderErrorMessage("pass")}
          </div>
          <div className="flex space-x-4 my-6 ">

            <input type="submit" className="border border-neonPink px-5 py-3 font-heading text-dynamicText font-bold text-neonPink duration-500 hover:bg-neonPink hover:text-white" />


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

