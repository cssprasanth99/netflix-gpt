import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [showSignInForm, setShowSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const fullname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
    setErrorMessage(null); // Clear error message when toggling
  };

  const handleButtonClick = () => {
    const message = checkValidData(
      fullname.current?.value || "",
      email.current.value,
      password.current.value,
      showSignInForm // isSignIn flag
    );

    setErrorMessage(message);
    if (message) return;

    if (!showSignInForm) {
      // Sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullname.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              // console.log("auth.currentuser", auth.currentUser);
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          console.log("Signed Up: ", userCredential.user);
        })
        .catch((error) => {
          console.log(`${error.code} - ${error.message}`);
          setErrorMessage(error.message);
        });
    } else {
      // Sign in
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Signed In: ", user);
        })
        .catch((error) => {
          console.log(`${error.code} - ${error.message}`);
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div className="relative h-screen w-full">
      <Header />
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cb17c41d-6a67-4472-8b91-cca977e65276/web/IN-en-20250505-TRIFECTA-perspective_03ae1a85-5dcf-4d20-a8a6-1e61f7ef73cb_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white p-10 rounded-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6">
          {showSignInForm ? "Sign In" : "Sign Up"}
        </h2>
        {!showSignInForm && (
          <input
            ref={fullname}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="w-full p-3 my-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <p className="text-red-300">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="w-full bg-red-600 hover:bg-red-700 transition-colors p-3 mt-4 rounded font-semibold"
        >
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
