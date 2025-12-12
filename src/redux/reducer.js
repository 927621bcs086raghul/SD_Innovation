import { combineReducers } from 'redux';
import homeReducer from '../component/home/homeSlice';

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
});

export default rootReducer;
