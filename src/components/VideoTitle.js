import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="text-white">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4 leading-tight">
        {title}
      </h1>
      <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 line-clamp-3">
        {overview}
      </p>
      <div className="flex space-x-2 sm:space-x-4">
        <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded hover:bg-opacity-90 transition">
          ▶ Play
        </button>
        <button className="bg-gray-500/70 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-lg font-semibold rounded hover:bg-gray-500/50 transition">
          ℹ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;