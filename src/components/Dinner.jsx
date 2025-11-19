import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Dinner() {
    const [Dinner, setDinner] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Dinner");
        if (storedData && storedData.length !== 0) {
            setDinner(JSON.parse(storedData));
        } else {
            const data = await getDinnerRecipes();
            if (data?.recipes) {
                localStorage.setItem("Dinner", JSON.stringify(data.recipes));
                setDinner(data.recipes);
            }
        }
    }

    async function getDinnerRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Dinner`
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
                <p>Dinner Picks</p>
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
                                perPage: 4,
                            },
                            900: {
                                perPage: 3,
                            },
                            600: {
                                perPage: 1,
                            },
                        },
                    }}
                >
                    {Dinner.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card dinner-card">
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
