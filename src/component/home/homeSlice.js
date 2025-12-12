import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  popularMovies: [],
  loading: false,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchPopularMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPopularMoviesSuccess(state, action) {
      state.loading = false;
      // TMDB returns { results: [...] }
      state.popularMovies = action.payload;
    },
    fetchPopularMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload || 'Failed to load popular movies';
    },
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
