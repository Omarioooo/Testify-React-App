import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [input, setInput] = useState("");
    const navigator = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.length === 0) {
            navigator(`/`);
        } else {
            navigator(`/search?q=${input}`);
        }
    };

    return (
        <div className="search">
            <div className="container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <FaSearch className="search-icon" />
                </form>
            </div>
        </div>
    );
}
