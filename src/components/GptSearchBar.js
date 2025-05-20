import React, { useRef, useState, useEffect } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import { gemini } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const langkey = useSelector((store) => store?.config.lang);
  const searchText = useRef(null);
  const [movieRecommendations, setMovieRecommendations] = useState([]); // Changed to array
  const chat = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGPTMovies = async (movie) => {
    const url =
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1";
    try {
      const response = await fetch(url, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results[0]; // Return the first movie result
    } catch (error) {
      console.error("Error fetching movie:", movie, error);
      return null; // Important: Return null on error to prevent crashing Promise.all
    }
  };

  useEffect(() => {
    chat.current = gemini.createChat();
  }, []);

  const handleGPTSearch = async () => {
    const userQuery = searchText.current.value;
    if (!userQuery.trim()) return;

    const instruction =
      "Suggest 5 recent movie titles related to the following query: ";
    const input =
      userQuery + ". Provide only the movie titles, separated by commas.";

    setLoading(true);
    setError(null);
    setMovieRecommendations([]);

    try {
      const geminiResponse = await chat.current.ask(`${instruction} ${input}`);
      const searchMovies = geminiResponse
        .split(",")
        .map((movie) => movie.trim());

      if (searchMovies.length > 5) {
        searchMovies.length = 5;
      }

      console.log("Movies from Gemini:", searchMovies);

      const promises = searchMovies.map((movie) => searchGPTMovies(movie));
      const movieResults = await Promise.all(promises);
      const validMovies = movieResults.filter((movie) => movie !== null);

      console.log("Movie Results from TMDB:", validMovies);
      setMovieRecommendations(validMovies); // Set state with TMDB data
    } catch (err) {
      console.error("Error during Gemini API call:", err);
      setError("Failed to get movie recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6 w-full px-4">
      <div className="flex w-full max-w-lg sm:max-w-xl space-x-3">
        <input
          type="text"
          ref={searchText}
          placeholder={lang[langkey].gptSearchPlaceholder}
          className="flex-grow px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 sm:text-sm"
        />
        <button
          className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 sm:text-sm"
          onClick={handleGPTSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langkey].search}
        </button>
      </div>

      {loading && (
        <p className="mt-4 text-gray-600">Loading recommendations...</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {movieRecommendations.length > 0 && !error && (
        <div className="mt-4 w-full max-w-lg sm:max-w-xl bg-gray-100 rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Recommended Movies:</h2>
          <ul className="list-disc list-inside">
            {movieRecommendations.map((movie) =>
              movie ? ( // Check if movie is not null
                <li key={movie.id} className="text-gray-800">
                  {movie.title} ({movie.release_date.substring(0, 4)})
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GptSearchBar;
