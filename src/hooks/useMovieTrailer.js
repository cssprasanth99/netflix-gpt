import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { trailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const url =
    "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US";

  // fetch trailer video

  const getmovieVideos = async () => {
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    // console.log(data);

    const movieTrailers = data.results.filter(
      (videos) => videos.type === "Trailer"
    );
    const trailer = movieTrailers.length ? movieTrailers[0] : data.results[0];
    // console.log(trailer);
    dispatch(trailerVideo(trailer));
  };

  useEffect(() => {
    getmovieVideos();
  }, []);
};

export default useMovieTrailer;
