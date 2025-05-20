import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies?.nowPlaying && (
      <div className="bg-black -mt-10 sm:-mt-20 relative z-20">
        <MovieList title="Now Playing" movies={movies?.nowPlaying} />
        <MovieList title="Popular" movies={movies?.popularMovies} />
        <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
        {/* Add more MovieList components for other categories if available */}
      </div>
    )
  );
};

export default SecondaryContainer;