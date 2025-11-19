import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Lunch() {
    const [Lunch, setLunch] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Lunch");
        if (storedData && storedData.length !== 0) {
            setLunch(JSON.parse(storedData));
        } else {
            const data = await getLunchRecipes();
            if (data?.recipes) {
                localStorage.setItem("Lunch", JSON.stringify(data.recipes));
                setLunch(data.recipes);
            }
        }
    }

    async function getLunchRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Lunch`
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
                <p>Lunch Picks</p>
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
                    {Lunch.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card lunch-card">
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
