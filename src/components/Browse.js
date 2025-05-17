// src/components/Browse.js
import React from "react";
import Header from "./Header";
import useNowPlaying from "../hooks/useNowPlaying";
import MainContiner from "./MainContiner";
import SecondaryContiner from "./SecondaryContiner";

const Browse = () => {
  useNowPlaying();

  return (
    <div>
      <Header />
      <h1 className="text-white text-center mt-10 text-3xl">
        Welcome to Browse Page
      </h1>
      {/*
         MainContainer
            -movie title
            -movie trailer
          Secondary Contianer
            - Movie list
              - movie cards
       */}
      <MainContiner />
      <SecondaryContiner />
    </div>
  );
};

export default Browse;
