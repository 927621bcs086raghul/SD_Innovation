import { SearchOutlined, StarFilled } from '@ant-design/icons';
import { Input, Layout, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPopularMoviesStart } from './homeSlice';
import './Index.css';
const { Header, Content, Footer } = Layout
const { Title, Text } = Typography


function Index() {
	const dispatch = useDispatch();

  const { popularMovies, loading } = useSelector((state) => state.home);
  console.log('Popular Movies:', popularMovies);

  useEffect(() => {
    dispatch(fetchPopularMoviesStart());
  }, []);

  return (
    <Layout className="movies-page-root">
      <Header className="movies-header">
        <div className="movies-header-inner">
          <div className="movies-header-left">
            <div className="movies-logo">
              <div className="movies-logo-icon" />
              <Title level={4} className="movies-logo-title">
                MovieStream
              </Title>
            </div>
          </div>
        </div>
      </Header>

            <Content className="movies-main">
        <div className="movies-main-inner">
          <div className="movies-heading-row">
            <Title level={2} className="movies-page-title">
              Popular Movies
            </Title>
            <div className="movies-search-wrapper">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search movies, series..."
                className="movies-search-input"
              />
            </div>
          </div>

          <div className="movies-grid">
            {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                  <article key={index} className="movies-card">
                    <div className="movies-card-poster">
                      <Skeleton avatar  active style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="movies-card-body">
                      <Skeleton
                        avatar
                        active
                        title={{ width: '80%' }}
                        paragraph={false}
                      />
                    </div>
                  </article>
                ))
              : popularMovies.map((movie) => (
                  <article key={movie.id} className="movies-card">
                    <div className="movies-card-poster">
                      <div className="movies-card-rating">
                        <StarFilled className="movies-card-rating-icon" />
                        <span className="movies-card-rating-text">
                          {(movie.vote_average / 2).toFixed(1)}
                        </span>
                      </div>
                      <Link to={`/movie/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                    </div>
                    <div className="movies-card-body">
                      <h3 className="movies-card-title">{movie.title}</h3>
                      <p className="movies-card-meta">
                        {movie.release_date
                          ? new Date(movie.release_date).getFullYear()
                          : 'N/A'}
                      </p>
                    </div>
                  </article>
                ))}
          </div>
        </div>
      </Content>

    </Layout>
  )
}

export default Index;