import { createSlice } from '@reduxjs/toolkit';

const loadInitialFavorites = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to parse favorites from localStorage', e);
    return [];
  }
};

const initialState = {
  items: loadInitialFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action) {
      const movie = action.payload;
      if (!movie || !movie.id) return;
      const exists = state.items.some((m) => m.id === movie.id);
      if (!exists) {
        state.items.push(movie);
      }
    },
    removeFavorite(state, action) {
      const id = action.payload;
      state.items = state.items.filter((m) => m.id !== id);
    },
    clearFavorites(state) {
      state.items = [];
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
