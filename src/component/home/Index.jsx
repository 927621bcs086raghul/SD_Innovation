import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMoviesStart } from './homeSlice';

const Index = () => {
  const dispatch = useDispatch();

  const { popularMovies } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchPopularMoviesStart());
  }, [dispatch]);

  return (
    <div>
      <h2>Popular Movies</h2>
          {popularMovies.map((movie) => (
            <p key={movie.id}>
              {movie.title}
            </p>
          ))}
    </div>
  );
};

export default Index;