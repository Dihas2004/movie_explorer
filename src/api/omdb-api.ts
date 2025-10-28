const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = process.env.REACT_APP_OMDB_API_KEY;


export async function searchMoviesByTitle(movieTitle: string) {
    try {
        if (!API_KEY) {
            throw new Error("API key is missing in the .env file");
        }
        const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "False") {
            throw new Error("No results found.");
        }
        return {
            movies: data.Search,
            totalResults: parseInt(data.totalResults, 10),
        };
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
}


export async function getMovieDetails(imdbID: string) {
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
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}