# Movie Info

A React movie browser built with Vite, powered by the TMDB API. Search for movies, view detailed info (cast, trailer, budget, genres), and save favorites that persist across sessions.

## Features

- 🔍 **Search** — look up any movie by title using TMDB's search API
- 🎬 **Movie details page** — full backdrop, overview, genres, rating, runtime, budget/revenue, production companies, and top cast
- ▶️ **Trailer links** — jumps straight to the YouTube trailer when available
- ❤️ **Favorites** — add/remove movies from your favorites list, saved in `localStorage` so it persists after refresh
- 📱 **Responsive design** — works across desktop and mobile screen sizes

## Tech Stack

- **React** — component-based UI
- **Vite** — build tool and dev server
- **React Router** — client-side routing (Home / Movie Details / Favorites)
- **Context API** — global favorites state management
- **TMDB API** — movie data, images, cast, and trailers

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Wolf-3317/movie-info.git
cd movie-info
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your TMDB API key
Create a `.env` file in the project root:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```
You can get a free API key by signing up at [themoviedb.org](https://www.themoviedb.org/documentation/api).

### 4. Run the dev server
```bash
npm run dev
```
The app will be running at `http://localhost:5173`.

## Project Structure

```
src/
├── components/       # Reusable UI pieces (MovieCard, NavBar)
├── contexts/         # Global state (favorites, via Context API)
├── css/              # Stylesheets
├── pages/            # Route-level pages (Home, MovieDetails, Favorites)
├── services/         # API calls to TMDB
└── App.jsx           # Routes and app layout
```

## Roadmap / Ideas

- [ ] "More like this" recommendations on the movie details page
- [ ] Sort/filter options on the Home page
- [ ] Pagination for search results

## License

This project is for personal/educational use. Movie data and images provided by [TMDB](https://www.themoviedb.org/)
