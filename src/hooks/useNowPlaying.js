import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMoviesList } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const movieList = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    // console.log(data.results);
    dispatch(addMoviesList(data.results));
  };

  useEffect(() => {
    movieList();
  }, []);
};

export default useNowPlaying;
