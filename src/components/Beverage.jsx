import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Beverage() {
    const [Beverage, setBeverage] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Beverage");
        if (storedData && storedData.length !== 0) {
            setBeverage(JSON.parse(storedData));
        } else {
            const data = await getBeverageRecipes();
            if (data?.recipes) {
                localStorage.setItem("Beverage", JSON.stringify(data.recipes));
                setBeverage(data.recipes);
            }
        }
    }

    async function getBeverageRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Beverage`
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
                <p>Beverage Picks</p>
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
                                gap: "25px",
                            },
                            992: {
                                perPage: 2,
                                gap: "10px",
                            },
                            576: {
                                perPage: 1,
                                gap: "10px",
                            },
                        },
                    }}
                >
                    {Beverage.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card beverage-card">
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
