import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Tag() {
    const { tag } = useParams();
    const [Recipe, setRecipes] = useState([]);

    useEffect(() => {
        fetchData(tag);
    }, [tag]);

    async function fetchData(tag) {
        const storedData = localStorage.getItem(`${tag}_tag`);
        if (storedData && storedData.length !== 0) {
            setRecipes(JSON.parse(storedData));
        } else {
            const data = await getTaggedRecipes(tag);
            if (data?.recipes) {
                localStorage.setItem(
                    `${tag}_tag`,
                    JSON.stringify(data.recipes)
                );
                setRecipes(data.recipes);
            }
        }
    }

    async function getTaggedRecipes(tag) {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/tag/${tag}`
            );
            return data;
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="recipe-wrapper">
                <div className="container">
                    <div className="tag-list">
                        {Recipe.length === 0 ? (
                            <div className="no-result">No results</div>
                        ) : (
                            Recipe.map((recipe) => (
                                <Link
                                    key={recipe.id}
                                    to={`/recipes/${recipe.id}`}
                                >
                                    <div className="tagged-item item">
                                        <div className="tagged-item-card card">
                                            <p className="recipe-name">
                                                {recipe.name}
                                            </p>
                                            <img
                                                src={recipe.image}
                                                alt={recipe.name}
                                            />
                                            <div className="overlay"></div>
                                        </div>
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
