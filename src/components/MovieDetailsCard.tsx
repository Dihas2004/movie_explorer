import React from "react";
import { Movie } from "../types/movieTypes";



export default function MovieDetailsCard(props: {movie: Movie}) {
    const {movie} = props;
    return (
        <div className="movie-details">
            <div className="poster-section">
                <h2 className="movie-title">{movie.Title}</h2>
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
                    alt={movie.Title}
                    className="movie-poster"
                    onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.fallbackApplied) return;
                        img.dataset.fallbackApplied = "true";
                        img.src = "/no-poster.jpg";
                    }}
                />
            </div>

            <div className="movie-info">
                <p><strong>Year:</strong> {movie.Year}</p>
                <p><strong>Genre:</strong> {movie.Genre}</p>
                <p><strong>Director:</strong> {movie.Director}</p>
                <p><strong>Actors:</strong> {movie.Actors}</p>
                <p><strong>Runtime:</strong> {movie.Runtime}</p>
                <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
                <p><strong>Plot:</strong> {movie.Plot}</p>
            </div>
        </div>
    );
}
