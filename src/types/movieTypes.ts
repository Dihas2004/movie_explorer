export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface MovieResponse {
    movies: Movie[];
    totalResults: number;
}
