import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Favorites from './component/favorites/Index';
import Home from './component/home/Index';
import MovieDetail from './component/movieDetail/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
