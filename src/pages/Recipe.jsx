import axios from "axios";
import { useEffect, useState } from "react";
import { FaFireAlt, FaStar } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { LuCookingPot } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Recipe() {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`https://dummyjson.com/recipes/${id}`)
            .then((res) => setRecipe(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="recipe-wrapper">
                <div className="container">
                    <div className="recipe">
                        <div className="recipe-image">
                            <img src={recipe.image} alt={recipe.name} />
                        </div>
                        <div className="recipe-content">
                            <h1 className="recipe-title">{recipe.name}</h1>
                            <div className="recipe-meta">
                                <span>
                                    <GiMeal /> Servings: {recipe.servings}
                                </span>

                                <span>
                                    <FaFireAlt /> Difficulty:{" "}
                                    {recipe.difficulty}
                                </span>

                                <span>
                                    <MdOutlineTimer /> Prep:{" "}
                                    {recipe.prepTimeMinutes} min
                                </span>

                                <span>
                                    <LuCookingPot /> Cook:{" "}
                                    {recipe.cookTimeMinutes} min
                                </span>

                                <span>
                                    <FaStar /> {recipe.rating} (
                                    {recipe.reviewCount})
                                </span>
                            </div>

                            <div className="recipe-tags">
                                {recipe.tags?.map((tag) => (
                                    <span key={tag} className="tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2>Ingredients</h2>
                            <ul className="ingredients">
                                {recipe.ingredients?.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <h2>Instructions</h2>
                            <ol className="instructions">
                                {recipe.instructions?.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
