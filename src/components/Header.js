import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Still listening...");
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black/60 to-transparent z-20">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black/80 to-transparent">
        <img
          className="w-36 sm:w-44 cursor-pointer"
          src={LOGO}
          alt="Netflix Logo"
          onClick={() => navigate("/browse")}
        />

        {user && (
          <div className="flex items-center gap-4 text-white">
            <p className="hidden sm:block font-semibold">{user.displayName}</p>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border border-white"
              />
            )}
            <button
              onClick={handleSignout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition duration-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
