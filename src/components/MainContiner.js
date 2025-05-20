import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movie = useSelector((store) => store.movies?.nowPlaying);

  if (!movie) return null;

  const { title, overview, id } = movie[0];

  return (
    <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full">
      <VideoBackground movieId={id} />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10"></div>
      <div className="absolute top-[30%] sm:top-[35%] md:top-[40%] left-4 sm:left-8 md:left-12 z-20 max-w-md sm:max-w-lg md:max-w-xl">
        <VideoTitle title={title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContainer;