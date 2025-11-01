import React, { useState } from "react";
import { searchMoviesByTitle } from "../api/omdb-api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MovieResponse } from "../types/movieTypes";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { MovieDetailPageActions } from "../providers/movieSlice";

export default function Home() {
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const { activeQuery, page } = useSelector((state: RootState) => state.movie);

    const { data, isLoading, isError, error } = useQuery<MovieResponse, Error>({
        queryKey: ["movies", activeQuery, page],
        queryFn: () => searchMoviesByTitle(activeQuery, page),
        enabled: !!activeQuery.trim(),
        staleTime: 0.2 * 60 * 1000,
        gcTime: 0.2 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false
    });

    const hasNextPage = data && page * 10 < data.totalResults;
    const hasPrevPage = page > 1;

    return (
        <div className="home-container">
            <h1 className="home-title">Movies</h1>

            <SearchBar
                defaultValue={activeQuery}
                onSearch={async (query: string) => {
                    dispatch(MovieDetailPageActions.setActiveQuery(query));
                    // dispatch(MovieDetailPageActions.setPage(1)); 
                    const queryKey = ["movies", query, 1];
                    const queryInfo = queryClient.getQueryState(queryKey);

                    const isStale = !queryInfo ||(queryInfo.dataUpdatedAt && Date.now() - queryInfo.dataUpdatedAt > 0.2 * 60 * 1000);

                    const isFetching = queryInfo?.fetchStatus === "fetching";

                    if (isStale && !isFetching) {
                        console.log("refetching from network");
                        await queryClient.invalidateQueries({ queryKey });
                    } else if (isFetching) {
                        console.log("fetching in progress");
                    } 
                    else {
                        console.log("using cache");
                    }
                }}
            />

            {!activeQuery ? (
                <p className="info-text">Please search for a movie to begin.</p>
            ) : isLoading ? (
                <p className="info-text">Loading...</p>
            ) : isError ? (
                <p className="error-text">Error: {(error as Error).message}</p>
            ) : data?.movies?.length ? (
                <>
                    <div className="movies-grid">
                        {data.movies.map((movie, index) => (
                            <MovieCard
                                key={`${movie.imdbID}-${page}-${index}`}
                                movie={movie}
                            />
                        ))}
                    </div>

                    <div className="pagination">
                        <button disabled={!hasPrevPage} onClick={() => dispatch(MovieDetailPageActions.setPage(page - 1))}>
                            Previous
                        </button>
                        <span>Page {page}</span>
                        <button disabled={!hasNextPage} onClick={() => dispatch(MovieDetailPageActions.setPage(page + 1))}>
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <p className="info-text">No results found.</p>
            )}

        </div>
    );
}