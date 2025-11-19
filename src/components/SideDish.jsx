import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function SideDish() {
    const [SideDish, setSideDish] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("SideDish");
        if (storedData && storedData.length !== 0) {
            setSideDish(JSON.parse(storedData));
        } else {
            const data = await getSideDishRecipes();
            if (data?.recipes) {
                localStorage.setItem("SideDish", JSON.stringify(data.recipes));
                setSideDish(data.recipes);
            }
        }
    }

    async function getSideDishRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Side Dish`
            );
            console.log(data.recipes);
            return data;
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    }

    return (
        <div className="recipe-wrapper">
            <div className="container">
                <p>SideDish Picks</p>
                <Splide
                    className="splide-list"
                    options={{
                        perPage: 5,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "40px",
                        breakpoints: {
                            1200: {
                                perPage: 3,
                                gap: "30px",
                            },
                            992: {
                                perPage: 2,
                                gap: "20px",
                            },
                            576: {
                                perPage: 1,
                                gap: "10px",
                            },
                        },
                    }}
                >
                    {SideDish.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card side-dish-card">
                                    <p>{recipe.name}</p>
                                    <img src={recipe.image} alt={recipe.name} />
                                    <div className="overlay"></div>
                                </div>
                            </Link>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
        </div>
    );
}
