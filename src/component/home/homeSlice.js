import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  popularMovies: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  searchTerm: '',
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
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    fetchSearchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSearchMoviesSuccess(state, action) {
      state.loading = false;
      state.popularMovies = action.payload.results;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
    },
    fetchSearchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload || 'Failed to search movies';
    },
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccess,
  fetchPopularMoviesFailure,
  setSearchTerm,
  fetchSearchMoviesStart,
  fetchSearchMoviesSuccess,
  fetchSearchMoviesFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
