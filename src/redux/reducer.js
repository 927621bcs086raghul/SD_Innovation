import { combineReducers } from 'redux';
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
});

export default rootReducer;
