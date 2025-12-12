import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movie: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {
    fetchMovieDetailStart(state, action) {
      state.loading = true;
      state.error = null;
      // we could store current id if needed: state.currentId = action.payload
    },
    fetchMovieDetailSuccess(state, action) {
      state.loading = false;
      state.movie = action.payload;
    },
    fetchMovieDetailFailure(state, action) {
      state.loading = false;
      state.error = action.payload || 'Failed to load movie details';
    },
  },
});

export const {
  fetchMovieDetailStart,
  fetchMovieDetailSuccess,
  fetchMovieDetailFailure,
} = movieDetailSlice.actions;

export default movieDetailSlice.reducer;
