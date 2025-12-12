import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './rootsaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
})


sagaMiddleware.run(rootSaga);

if (typeof window !== 'undefined') {
  store.subscribe(() => {
    try {
      const state = store.getState();
      const favorites = state.favorites?.items ?? [];
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  });
}

export default store;
