import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-6 line-clamp-3">{overview}</p>
      <div className="flex space-x-4">
        <button className="bg-white text-black px-6 py-2 text-lg rounded hover:bg-opacity-80 transition">
          Play
        </button>
        <button className="bg-gray-700 bg-opacity-70 text-white px-6 py-2 text-lg rounded hover:bg-opacity-50 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
