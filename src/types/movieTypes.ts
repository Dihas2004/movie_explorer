export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre?: string;
    Director?: string;
    Actors?: string;
    Plot?: string;
    Runtime?: string;
    imdbRating?: string;
}

export interface MovieResponse {
    movies: Movie[];
    totalResults: number;
}
