import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Track whether it's Sign Up or Sign In
  const [userType, setUserType] = useState("buyer"); // Track user type
  const { createUser, updateUserProfile, signIn } = useContext(AuthContext);
  const [createdUserEmail, setCreatedUserEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "";

  const handleSignIn = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setLoginError("");
        navigate("/allProperty");
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  const handleSignUp = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        handleUpdateUser(data.name, data.email);
        toast.success("Successfully registered");
        saveUser(data.name, data.email, userType);

        // Check the user type and navigate accordingly
        if (userType === "buyer") {
          navigate("/buyerRoute"); // Replace with your buyer route path
        } else if (userType === "seller") {
          navigate("/sellerForm"); // Replace with your seller route path
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUser = (name, email, userRole) => {
    const user = { name, email, userRole };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (loading) {
          return <Loader></Loader>;
        }
        setCreatedUserEmail(email);
      });
  };

  const handleUpdateUser = (name, email) => {
    const profile = {
      displayName: name,
      email,
    };
    updateUserProfile(profile)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp); // Toggle between Sign In and Sign Up
  };

  return (
    <div>
      <div className="flex justify-center h-screen items-center pt-8">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>
            <p className="text-sm text-gray-400">
              {isSignUp
                ? "Create an account"
                : "Sign in to access your account"}
            </p>
          </div>
          <form
            onSubmit={
              isSignUp ? handleSubmit(handleSignUp) : handleSubmit(handleSignIn)
            }
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            {isSignUp && (
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  id="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                {...register("password")}
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
              />
            </div>
            {isSignUp && ( // Render the radio buttons only during signup
              <div>
                <label className="block mb-2 text-sm">User Type</label>
                <label className="block">
                  <input
                    {...register("buyer")}
                    type="radio"
                    value="buyer"
                    checked={userType === "buyer"}
                    onChange={() => setUserType("buyer")}
                  />
                  Buyer
                </label>
                <label className="block">
                  <input
                    {...register("seller")}
                    type="radio"
                    value="seller"
                    checked={userType === "seller"}
                    onChange={() => setUserType("seller")}
                  />
                  Seller
                </label>
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full px-8 py-3 font-semibold rounded-md bg-gradient-to-r from-red-600 to-red-800 hover:text-white text-gray-100"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-red-600">{loginError}</p>
          </div>
          <div className="space-y-1">
            <button className="text-xs hover:underline text-gray-400">
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            {isSignUp
              ? "Already have an account?"
              : "Do not have an account yet?"}{" "}
            <button
              onClick={toggleSignUp}
              className="hover:underline text-gray-600"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
