import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMovie = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(id);
                setMovie(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError("Failed to load movie details...");
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [id]);

    if (loading) return <div className="details-status">Loading...</div>;
    if (error) return <div className="details-status">{error}</div>;
    if (!movie) return null;

    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = () => {
        if (favorite) removeFromFavorites(movie.id);
        else addToFavorites(movie);
    };

    const year = movie.release_date ? movie.release_date.split("-")[0] : "—";
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "—";
    const formatMoney = (num) => (num ? `$${num.toLocaleString()}` : "—");

    const trailer = movie.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );
    const topCast = movie.credits?.cast?.slice(0, 6) || [];

    return (
        <div className="details-page">
            <div
                className="details-backdrop"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : "none"
                }}
            >
                <div className="details-backdrop-fade" />
            </div>

            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="details-content">
                <img
                    className="details-poster"
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                />

                <div className="details-info">
                    <h1 className="details-title">{movie.title}</h1>
                    {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

                    <div className="details-meta">
                        <span className="details-rating">★ {movie.vote_average?.toFixed(1)}</span>
                        <span>{year}</span>
                        <span>{runtime}</span>
                        <span className="status-pill">{movie.status}</span>
                    </div>

                    <div className="details-genres">
                        {movie.genres?.map((genre) => (
                            <span className="genre-pill" key={genre.id}>
                                {genre.name}
                            </span>
                        ))}
                    </div>

                    <h3 className="details-overview-title">Overview</h3>
                    <p className="details-overview">{movie.overview}</p>

                    <div className="details-actions">
                        <button
                            className={`details-favorite-btn ${favorite ? "active" : ""}`}
                            onClick={handleFavoriteClick}
                        >
                            {favorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
                        </button>

                        {trailer && (
                            <a
                                className="trailer-btn"
                                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▶ Watch Trailer
                            </a>
                        )}
                    </div>
                </div>

                <div className="details-stats">
                    <div className="stat-box">
                        <span className="stat-label">Budget</span>
                        <span className="stat-value">{formatMoney(movie.budget)}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Revenue</span>
                        <span className="stat-value">{formatMoney(movie.revenue)}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Original Language</span>
                        <span className="stat-value">{movie.original_language?.toUpperCase()}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Production</span>
                        <span className="stat-value">
                            {movie.production_companies?.slice(0, 2).map((c) => c.name).join(", ") || "—"}
                        </span>
                    </div>
                </div>
            </div>

            {topCast.length > 0 && (
                <div className="cast-section">
                    <h3 className="cast-title">Top Cast</h3>
                    <div className="cast-grid">
                        {topCast.map((actor) => (
                            <div className="cast-card" key={actor.id}>
                                <img
                                    src={
                                        actor.profile_path
                                            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                            : "https://via.placeholder.com/200x300?text=No+Photo"
                                    }
                                    alt={actor.name}
                                />
                                <p className="cast-name">{actor.name}</p>
                                <p className="cast-character">{actor.character}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;