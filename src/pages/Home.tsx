import React, { useState } from "react";
import { searchMoviesByTitle } from "../api/omdb-api";
import { useQuery } from "@tanstack/react-query";
import { MovieResponse } from "../types/movieTypes";

export default function Home() {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error } = useQuery<MovieResponse, Error>({
        queryKey: ["movies", "Batman", page],
        queryFn: () => searchMoviesByTitle("Batman", page),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    const hasNextPage = data && page * 10 < data.totalResults;
    const hasPrevPage = page > 1;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Batman Movies</h1>

            <ul>
                {data?.movies.map((movie, index) => (
                    <li key={`${movie.imdbID}-${page}-${index}`}>
                        {movie.Title} ({movie.Year})
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: "20px" }}>
                <button disabled={!hasPrevPage} onClick={() => setPage(page - 1)}>
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {page}</span>
                <button disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}