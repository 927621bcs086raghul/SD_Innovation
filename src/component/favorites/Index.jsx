import { Button, Layout, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Index.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const navigate = useNavigate();

  return (
    <Layout className="fav-movies-page-root">
      <Header className="fav-movies-header">
        <div className="fav-movies-header-inner">
          <div className="fav-movies-header-left">
            <div className="fav-movies-logo">
              <div className="fav-movies-logo-icon" />
              <Title level={4} className="fav-movies-logo-title">
                MovieStream
              </Title>
            </div>
          </div>
          <Button
            type="default"
            className="back-nav-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>
      </Header>

      <Content className="movies-main">
        <div className="movies-main-inner">
          <Title level={2} className="movies-page-title">
            My Favorites
          </Title>

          {favorites.length === 0 ? (
            <Text type="secondary">You have no favorites yet.</Text>
          ) : (
            <div className="movies-grid">
              {favorites.map((movie) => (
                <article key={movie.id} className="movies-card">
                  <div className="movies-card-poster">
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
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default Favorites;
