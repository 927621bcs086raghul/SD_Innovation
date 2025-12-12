import { Layout, List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../home/Index.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <Layout className="movies-page-root">
      <Header className="movies-header">
        <div className="movies-header-inner">
          <div className="movies-header-left">
            <div className="movies-logo">
              <div className="movies-logo-icon" />
              <Title level={4} className="movies-logo-title">
                My Favorites
              </Title>
            </div>
          </div>
        </div>
      </Header>

      <Content className="movies-main">
        <div className="movies-main-inner">
          <Title level={2} className="movies-page-title">
            Saved Movies
          </Title>
          {favorites.length === 0 ? (
            <Text type="secondary">You have no favorites yet.</Text>
          ) : (
            <List
              dataSource={favorites}
              renderItem={(movie) => (
                <List.Item>
                  <Link to={`/movie/${movie.id}`}>
                    {movie.title}
                  </Link>
                </List.Item>
              )}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}

export default Favorites;
