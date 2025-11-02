import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../api/omdb-api";
import { Movie } from "../types/movieTypes";
import MovieDetailsCard from "../components/MovieDetailsCard";

export default function MovieDetails() {
    const { imdbID } = useParams<{ imdbID: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                if (!imdbID) return;
                const data = await getMovieDetails(imdbID);
                setMovie(data);
            } catch (err) {
                setError("Failed to load movie details.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovie();
    }, [imdbID]);

    if (isLoading) return <p className="info-text">Loading movie details...</p>;
    if (error) return <p className="error-text">{error}</p>;
    if (!movie) return <p className="info-text">No movie found.</p>;

    return (
        <div className="movie-details-container">
            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>
            <MovieDetailsCard 
                movie={movie} 
            />
        </div>
    );
}
