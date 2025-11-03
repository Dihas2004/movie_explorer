import { Movie } from "../types/movieTypes";
import "../index.css"; 
import { useNavigate } from "react-router-dom";

export default function MovieCard(props: { movie: Movie }) {
    const {movie} = props;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.imdbID}`);
    };
    return (
        <div className="movie-card" onClick={handleClick}>
            <img
                src={movie.Poster !== "N/A" ? movie.Poster.replace("http://", "https://") : "/no-poster.jpg"}
                alt={movie.Title}
                onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied) return;
                    img.dataset.fallbackApplied = "true";
                    img.src = "/no-poster.jpg";
                }}
            />
            <div className="movie-card-content">
                <h3 className="movie-card-title">{movie.Title}</h3>
                <p className="movie-card-year">{movie.Year}</p>
                <p className="movie-card-type">{movie.Type}</p>
            </div>
        </div>
    );
}
