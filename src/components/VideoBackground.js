import React from "react";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  if (!trailer?.key) return null;

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] -z-10 overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer?.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
