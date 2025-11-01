import React, { useEffect, useState } from "react";

export default function SearchBar(props: { onSearch: (query: string) => void; defaultValue?: string; }) {
    const { onSearch } = props;
    const [movieTitle, setMovieTitle] = useState(props.defaultValue || "");

    useEffect(() => {
        setMovieTitle(props.defaultValue || "");
    }, [props.defaultValue]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (movieTitle.trim()) {
            onSearch(movieTitle);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Search movies"
                className="search-input"
            />
            <button type="submit" className="search-button">
                Search
            </button>
        </form>
    );
}
