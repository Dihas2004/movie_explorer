import { Movie, MovieResponse } from "../types/movieTypes";

const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;


export async function searchMoviesByTitle(movieTitle: string,page: number): Promise<MovieResponse> {
    try {
        if (!API_KEY) {
            throw new Error("API key is missing in the .env file");
        }
        console.log(`Fetching from OMDb: ${movieTitle} (page ${page})`);
        const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(movieTitle)}&page=${page}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "False") {
            throw new Error("No results found.");
        }
        // return {
        //     movies: data.Search as Movie[],
        //     totalResults: parseInt(data.totalResults, 10),
        // };
        const movieResponseResult: MovieResponse = { movies: data.Search as Movie[], totalResults: Number(data.totalResults) };
        return movieResponseResult
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}


export async function getMovieDetails(imdbID: string): Promise<Movie> {
    try {
        if (!API_KEY) {
            throw new Error("OMDb API key is missing. Check your .env file.");
        }
        const response = await fetch(`${BASE_URL}?i=${encodeURIComponent(imdbID)}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "False") {
            throw new Error("Movie details not found.");
        }
        return data as Movie;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}