import React, { useState } from "react";
import { searchMoviesByTitle } from "../api/omdb-api";
import { useQuery } from "@tanstack/react-query";
import { MovieResponse } from "../types/movieTypes";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading, isError, error } = useQuery<MovieResponse, Error>({
        queryKey: ["movies", searchTerm, page],
        queryFn: () => searchMoviesByTitle(searchTerm, page),
        enabled: !!searchTerm.trim(),
        staleTime: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false
    });

    const hasNextPage = data && page * 10 < data.totalResults;
    const hasPrevPage = page > 1;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Movies</h1>

            <SearchBar
                searchTerm={searchTerm}
                onSearch={(query: string) => {
                    setSearchTerm(query);
                    setPage(1); 
                }}
            />

            {!searchTerm ? (
                <p style={{ fontStyle: "italic", color: "#555" }}>
                    Please search for a movie to begin.
                </p>
            ) : isLoading ? (
                <p>Loading...</p>
            ) : isError ? (
                <p>Error: {(error as Error).message}</p>
            ) : data?.movies?.length ? (
                <>
                    <ul>
                        {data.movies.map((movie, index) => (
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
                </>
            ) : (
                <p>No results found.</p>
            )}

        </div>
    );
}