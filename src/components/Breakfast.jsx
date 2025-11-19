import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Breakfast() {
    const [Breakfast, setBreakfast] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Breakfast");
        if (storedData && storedData.length !== 0) {
            setBreakfast(JSON.parse(storedData));
        } else {
            const data = await getBreakfastRecipes();
            if (data?.recipes) {
                localStorage.setItem("Breakfast", JSON.stringify(data.recipes));
                setBreakfast(data.recipes);
            }
        }
    }

    async function getBreakfastRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Breakfast`
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
                <p>Breakfast Picks</p>
                <Splide
                    className="splide-list"
                    options={{
                        perPage: 3,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "40px",
                        breakpoints: {
                            1200: {
                                perPage: 2,
                            },
                            900: {
                                perPage: 2,
                            },
                            600: {
                                perPage: 1,
                            },
                        },
                    }}
                >
                    {Breakfast.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card breakfast-card">
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
