import axios from "axios";

export const API = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	
});

API.interceptors.request.use(
  (config) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGI5YTIyYTM4ZmE4MjhhMzY1ZDAxZTgzYzJmZTFjMSIsIm5iZiI6MTc2NTUzODM2MC4wMDQ5OTk5LCJzdWIiOiI2OTNiZmEzODdiNTkxY2FjZjRlMGJjMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.O_YvdBs7zSvxUFO67l2ZQCZtqOKRAjNtTuIMU5VBufo";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchPopularMoviesApi = (page = 1) =>
  API.get('/movie/popular', {
    params: {
      language: 'en-US',
      page,
    },
  });

export const fetchMovieDetailApi = (movieId) => API.get(`/movie/${movieId}`);

export const fetchSearchMoviesApi = (query, page = 1) =>
  API.get('/search/movie', {
    params: {
      query,
      language: 'en-US',
      page,
      include_adult: false,
    },
  });

