import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchPopularMoviesApi } from '../api/apiconfig';
import {
    fetchPopularMoviesFailure,
    fetchPopularMoviesStart,
    fetchPopularMoviesSuccess,
} from '../component/home/homeSlice';

function* handleFetchPopularMovies() {
  try {
    const response = yield call(fetchPopularMoviesApi);
    const results = response?.data?.results || [];
    yield put(fetchPopularMoviesSuccess(results));
  } catch (error) {
    yield put(
      fetchPopularMoviesFailure(error?.message || 'Failed to load popular movies')
    );
  }
}

function* watchPopularMovies() {
  yield takeLatest(fetchPopularMoviesStart.type, handleFetchPopularMovies);
}

export default function* rootSaga() {
  yield all([
    watchPopularMovies(),
  ]);
}
