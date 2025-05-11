import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
  };

  return (
    <div className="relative h-screen w-full">
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Login Form */}
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white p-10 rounded-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        {!showSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button className="w-full bg-red-600 hover:bg-red-700 transition-colors p-3 mt-4 rounded font-semibold">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <label>
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <span className="cursor-pointer hover:underline">Need help?</span>
        </div>
        <p className="mt-6 text-gray-400">
          {showSignInForm ? "New to Netflix? " : "Already Registered? "}
          <span
            className="text-white cursor-pointer hover:underline"
            onClick={toggleSignInForm}
          >
            {showSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
