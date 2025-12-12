import { combineReducers } from 'redux';
import favoritesReducer from '../component/favorites/favoritesSlice';
import homeReducer from '../component/home/homeSlice';
import movieDetailReducer from '../component/movieDetail/movieDetailSlice';

const initialState = {};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  movieDetail: movieDetailReducer,
  favorites: favoritesReducer,
});

export default rootReducer;
