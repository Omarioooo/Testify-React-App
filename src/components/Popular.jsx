import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("popular");
        if (storedData) {
            setPopular(JSON.parse(storedData));
        } else {
            const data = await getRandomRecipes();
            if (data?.recipes) {
                localStorage.setItem("popular", JSON.stringify(data.recipes));
                setPopular(data.recipes);
            }
        }
    }

    function getRandomSkip(total = 50, limit = 9) {
        return Math.floor(Math.random() * (total - limit));
    }

    async function getRandomRecipes(limit = 9) {
        const total = 50;
        const skipVal = getRandomSkip(total, limit);

        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes?limit=${limit}&skip=${skipVal}`
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
                <p>Popular Picks</p>
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
                                gap: "30px",
                            },
                            992: {
                                perPage: 3,
                                gap: "20px",
                            },
                            576: {
                                perPage: 1,
                                gap: "10px",
                            },
                        },
                    }}
                >
                    {popular.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card popular-card">
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
