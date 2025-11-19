import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Dessert() {
    const [Dessert, setDessert] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Dessert");
        if (storedData && storedData.length !== 0) {
            setDessert(JSON.parse(storedData));
        } else {
            const data = await getDessertRecipes();
            if (data?.recipes) {
                localStorage.setItem("Dessert", JSON.stringify(data.recipes));
                setDessert(data.recipes);
            }
        }
    }

    async function getDessertRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Dessert`
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
                <p>Dessert Picks</p>
                <Splide
                    className="splide-list"
                    options={{
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        drag: "free",
                        gap: "40px",
                        breakpoints: {
                            1200: {
                                perPage: 3,
                                gap: "25px",
                            },
                            992: {
                                perPage: 3,
                                gap: "10px",
                            },
                            576: {
                                perPage: 1,
                                gap: "10px",
                            },
                        },
                    }}
                >
                    {Dessert.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card dessert-card">
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
