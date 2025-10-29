import { Movie } from "../types/movieTypes";
import "../index.css"; 

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"}
        alt={movie.Title}
      />
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.Title}</h3>
        <p className="movie-card-year">{movie.Year}</p>
        <p className="movie-card-type">{movie.Type}</p>
      </div>
    </div>
  );
}
