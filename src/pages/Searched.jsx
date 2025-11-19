import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Searched() {
    const [recipes, setRecipes] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    useEffect(() => {
        if (query) {
            axios
                .get(`https://dummyjson.com/recipes/search?q=${query}`)
                .then((res) => setRecipes(res.data.recipes))
                .catch((err) => console.error(err));
        }
    }, [query]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="search-wrapper">
                <div className="container">
                    <div className="recipes-list">
                        {recipes.length === 0 ? (
                            <div className="no-result">No results</div>
                        ) : (
                            recipes.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    to={`/recipes/${recipe.id}`}
                                >
                                    <div className="searched-card">
                                        <p>{recipe.name}</p>
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                        />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
