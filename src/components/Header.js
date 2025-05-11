import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black z-20">
      <img
        className="w-44"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />
      <button className="text-white font-semibold bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors">
        Sign In
      </button>
    </div>
  );
};

export default Header;
