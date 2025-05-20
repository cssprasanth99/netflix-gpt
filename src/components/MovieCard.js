import React from "react";
import { IMAGE_PATH } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  return (
    <div className="flex-shrink-0 w-32 sm:w-40 md:w-48 lg:w-56 mx-1 sm:mx-2 transform hover:scale-105 transition-transform duration-300">
      <img
        className="w-full rounded-md shadow-lg object-cover"
        alt="Movie Poster"
        src={IMAGE_PATH + posterPath}
      />
    </div>
  );
};

export default MovieCard;
