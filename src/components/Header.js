import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showLanguage = useSelector((store) => store?.gpt.showGptSearch);

  const handleShowGPT = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-gradient-to-b from-black/90 via-black/70 to-transparent">
      <img
        className="w-24 sm:w-32 md:w-36 cursor-pointer"
        src={LOGO}
        alt="Netflix Logo"
        onClick={() => navigate("/browse")}
      />
      {user && (
        <div className="flex items-center gap-2 sm:gap-4">
          {showLanguage && (
            <select
              onChange={handleChangeLanguage}
              className="px-2 py-1.5 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="px-3 py-1.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 sm:text-sm"
            onClick={handleShowGPT}
          >
            {showLanguage ? "Home" : "GPT Search"}
          </button>
          <p className="hidden sm:block text-white text-sm font-medium">
            {user.displayName}
          </p>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-600"
            />
          )}
          <button
            onClick={handleSignout}
            className="px-3 py-1.5 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;