import React from "react";
import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import MainContainer from "./MainContiner";
import SecondaryContainer from "./SecondaryContiner";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlaying();
  usePopularMovies();
  useUpcomingMovies();
  const showGPT = useSelector((store) => store?.gpt.showGptSearch);

  return (
    <div className="bg-netflix-black min-h-screen">
      <Header />
      {showGPT ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
