## Movie Discovery App

A React + Vite movie discovery app that uses The Movie Database (TMDB) API to show popular movies, search titles, view movie details, and manage a local "My Favorites" list.

---

## 1. Setup Instructions

- Requirements:
	- Node.js 18+ (recommended)
	- npm or yarn

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The app runs on the Vite dev server (usually http://localhost:5173).

---

## 2. TMDB API Key Configuration

This project uses TMDB v3/v4 API via a Bearer token. The token **must not** be hard-coded in the codebase.

1. Create a `.env` file in the project root (same folder as `package.json`).
2. Add your TMDB access token:

```bash
VITE_TMDB_ACCESS_TOKEN=YOUR_TMDB_BEARER_TOKEN_HERE
```

3. Restart the dev server (`npm run dev`).

How it’s used:

- The axios instance in `src/api/apiconfig.js` reads the token as:
	- `const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;`
	- If present, it sends `Authorization: Bearer <token>` with every request.

Endpoints used:

- Popular: `/movie/popular?language=en-US&page={page}`
- Detail: `/movie/{id}`
- Search: `/search/movie?language=en-US&query={query}&page={page}`

---

## 3. Main Features & Design Decisions

- **State management with Redux Toolkit + redux-saga**
	- `homeSlice` manages popular/search results, loading, error, and pagination.
	- `movieDetailSlice` manages the selected movie detail.
	- Sagas handle side-effects and API calls, keeping components slim.

- **Axios API layer**
	- Centralized axios instance in `src/api/apiconfig.js`.
	- Small helper functions (`fetchPopularMoviesApi`, `fetchMovieDetailApi`, `fetchSearchMoviesApi`) hide URL/query details from the rest of the app.

- **Search with debouncing**
	- Custom hook `src/hook/debounce.js` waits 500ms after user stops typing before firing `/search/movie`.
	- When search box is empty, the app falls back to the paginated `/movie/popular` list.

- **Pagination**
	- Popular movies support page navigation (Prev / Next).
	- Pagination state (`page`, `totalPages`) is stored in Redux and driven by saga responses.

- **Favorites with localStorage**
	- `favoritesSlice` stores a list of favorite movies (`favorites.items`).
	- Store subscribes to changes and persists favorites into `localStorage`.
	- On load, favorites are hydrated from `localStorage` so user choices survive refreshes.
	- "My Favorites" page shows saved movies as cards and lets you click through to details.

- **UI & styling**
	- Built with React + Ant Design components (inputs, buttons, typography, skeletons).
	- Custom CSS in `src/component/home/Index.css` and `src/component/movieDetail/Index.css` for the card grid, rating badges, and MovieStream header.

---

## 4. Future Improvements

- **Stronger typing**
	- Migrate to TypeScript and add proper TMDB response interfaces.

- **Better error & loading states**
	- Global error boundary and toast messaging for all API failures.
	- Empty state visuals for search with no results.

- **Filter and sort options**
	- Filters for genre, year, rating and sort by popularity or release date.

- **Favorites enhancements**
	- Sync favorites to a backend for cross-device persistence.
	- Add tags or notes per favorite.

- **Routing & layout**
	- Top-level navigation between Home, Favorites, and possibly other discovery tabs.
	- Responsive layout refinements for tablets and very small screens.

- **Testing**
	- Add unit tests for slices, sagas, and the debounce hook.
	- Add basic component tests for Home, MovieDetail, and Favorites pages.

