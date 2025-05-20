import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BG_IMG } from "../utils/constants";

const GptSearch = () => {
  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src={BG_IMG}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Centered Search Bar */}
      <div className="flex items-center justify-center pt-32 sm:pt-40 px-4">
        <GptSearchBar />
      </div>

      {/* Suggestions */}
      <div className="px-4 mt-8 -z-10 sm:mt-8">
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;
