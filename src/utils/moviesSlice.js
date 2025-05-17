import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null,
    trailerVideo: null,
  },
  reducers: {
    addMoviesList: (state, action) => {
      state.nowPlaying = action.payload;
    },
    trailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export default moviesSlice.reducer;

export const { addMoviesList, trailerVideo } = moviesSlice.actions;
