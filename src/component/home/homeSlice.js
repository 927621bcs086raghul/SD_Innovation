import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  popularMovies: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    fetchPopularMoviesStart(state, action) {
      state.loading = true;
      state.error = null;
      state.page = action.payload || 1;
    },
    fetchPopularMoviesSuccess(state, action) {
      state.loading = false;
      state.popularMovies = action.payload.results;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
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
