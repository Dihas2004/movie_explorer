import React, { useEffect, useState } from "react";

export default function SearchBar(props: { onSearch: (query: string) => void}) {
    const { onSearch } = props;
    const [term, setTerm] = useState("");

    // useEffect(() => {
    //     setTerm(searchTerm);
    // }, [searchTerm]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search movies"
                style={{ padding: "8px", width: "250px" }}
            />
            <button type="submit" style={{marginLeft: "10px", padding: "8px 12px", cursor: "pointer"}}>
                Search
            </button>
        </form>
    );
}
