import { message } from 'antd';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchMovieDetailApi, fetchPopularMoviesApi } from '../api/apiconfig';
import {
    fetchPopularMoviesFailure,
    fetchPopularMoviesStart,
    fetchPopularMoviesSuccess,
} from '../component/home/homeSlice';
import {
    fetchMovieDetailFailure,
    fetchMovieDetailStart,
    fetchMovieDetailSuccess,
} from '../component/movieDetail/movieDetailSlice';

function* handleFetchPopularMovies(action) {
  try {
    const requestedPage = action.payload || 1;
    const response = yield call(fetchPopularMoviesApi, requestedPage);
    const data = response?.data || {};
    const results = data.results || [];
    const page = data.page || requestedPage;
    const totalPages = data.total_pages || 1;

    yield put(fetchPopularMoviesSuccess({ results, page, totalPages }));
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

function* handleFetchMovieDetail(action) {
  try {
    const movieId = action.payload;
    const response = yield call(fetchMovieDetailApi, movieId);
    yield put(fetchMovieDetailSuccess(response.data));
  } catch (error) {
    const errorMsg = error?.message || 'Failed to load movie details';
    yield put(fetchMovieDetailFailure(errorMsg));
    message.error(errorMsg);
  }
}

function* watchMovieDetail() {
  yield takeLatest(fetchMovieDetailStart.type, handleFetchMovieDetail);
}

export default function* rootSaga() {
  yield all([
    watchPopularMovies(),
    watchMovieDetail(),
  ]);
}
