import React, { useEffect } from "react";
import { getMovieDetails, searchMoviesByTitle } from "../api/omdb-api";

export default function Home() {
    useEffect(() => {
        searchMoviesByTitle("Batman")
            .then((data) => {
                console.log("Movies fetched successfully!");
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });

        getMovieDetails("tt0372784")
            .then((data) => {
                console.log("Movie Details fetched successfully!");
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);
    return <h1>Checking API Calls</h1>;
}
