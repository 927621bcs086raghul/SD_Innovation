import { Button, Layout, Skeleton, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Index.css';
import { fetchMovieDetailStart } from './movieDetailSlice';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movie, loading, error } = useSelector((state) => state.movieDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetailStart(id));
    }
  }, [ id]);

  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : null;

  return (
    <Layout className="movie-detail-page">
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
          <Button type="default" className='back-nav-btn' onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </Header>

      <Content className="movie-detail-main">
        <div className="movie-detail-inner">
          <div className="movie-detail-poster-wrap">
            {loading ? (
              <Skeleton.Image active style={{ width: '100%', height: 480 }} />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
              />
            )}
          </div>

          <div className="movie-detail-meta">
            {loading ? (
              <Skeleton active title paragraph={{ rows: 4 }} />
            ) : error ? (
              <Text type="danger">{error}</Text>
            ) : (
              <>
                <div className="movie-detail-title-row">
                  <Title level={2} style={{ margin: 0 }}>
                    {movie?.title}
                  </Title>
                  {year && <span className="movie-detail-year">({year})</span>}
                </div>

                {movie?.tagline && (
                  <p className="movie-detail-tagline">{movie.tagline}</p>
                )}

                <div className="movie-detail-chips">
                  {movie?.genres?.map((g) => (
                    <span key={g.id} className="movie-detail-chip">
                      {g.name}
                    </span>
                  ))}
                </div>

                <Paragraph className="movie-detail-overview">{movie?.overview}</Paragraph>

                <div className="movie-detail-info-grid">
                  <div className="movie-detail-info-item">
                    <div className="movie-detail-info-label">Runtime</div>
                    <div className="movie-detail-info-value">{movie?.runtime} min</div>
                  </div>
                  <div className="movie-detail-info-item">
                    <div className="movie-detail-info-label">Status</div>
                    <div className="movie-detail-info-value">{movie?.status}</div>
                  </div>
                  <div className="movie-detail-info-item">
                    <div className="movie-detail-info-label">Language</div>
                    <div className="movie-detail-info-value">
                      {movie?.spoken_languages?.[0]?.english_name || 'N/A'}
                    </div>
                  </div>
                  <div className="movie-detail-info-item">
                    <div className="movie-detail-info-label">Release</div>
                    <div className="movie-detail-info-value">{movie?.release_date}</div>
                  </div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <span className="movie-detail-rating-pill">
                    <span className="movie-detail-rating-score">
                      {movie?.vote_average?.toFixed(1)}
                    </span>
                    <span className="movie-detail-rating-count">
                      {movie?.vote_count?.toLocaleString()} votes
                    </span>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default MovieDetail;
