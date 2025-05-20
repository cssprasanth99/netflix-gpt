import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const movieList = async () => {
    const url =
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    // console.log(data.results);
    dispatch(addUpcomingMovies(data.results));
  };

  useEffect(() => {
    movieList();
  }, []);
};

export default useUpcomingMovies;
