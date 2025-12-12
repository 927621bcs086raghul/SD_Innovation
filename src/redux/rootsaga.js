import { message } from 'antd';
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
    message.success('Popular movies loaded successfully');
  } catch (error) {
    const errorMsg = error?.message || 'Failed to load popular movies';
    yield put(
      fetchPopularMoviesFailure(errorMsg)
    );
    message.error(errorMsg);
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
