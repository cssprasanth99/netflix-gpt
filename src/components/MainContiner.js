import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContiner = () => {
  const movie = useSelector((store) => store.movies?.nowPlaying);

  if (!movie) return null;

  const { title, overview, id } = movie[0];

  return (
    <div className="relative h-[90vh] text-white">
      <VideoBackground movieId={id} />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
      <div className="absolute top-1/3 left-12 z-20 max-w-xl">
        <VideoTitle title={title} overview={overview} />
      </div>
    </div>
  );
};

export default MainContiner;
