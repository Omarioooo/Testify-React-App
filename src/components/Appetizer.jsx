import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css/skyblue";

export default function Appetizer() {
    const [Appetizer, setAppetizer] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Appetizer");
        if (storedData && storedData.length !== 0) {
            setAppetizer(JSON.parse(storedData));
        } else {
            const data = await getAppetizerRecipes();
            if (data?.recipes) {
                localStorage.setItem("Appetizer", JSON.stringify(data.recipes));
                setAppetizer(data.recipes);
            }
        }
    }

    async function getAppetizerRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Appetizer`
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
                <p>Appetizer Picks</p>
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
                                gap: "10px",
                            },
                            576: {
                                perPage: 1,
                                gap: "10px",
                            },
                        },
                    }}
                >
                    {Appetizer.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card appetizer-card">
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
