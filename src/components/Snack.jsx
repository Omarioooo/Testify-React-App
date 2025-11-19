import axios from "axios";
import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import { Link } from "react-router-dom";

export default function Snack() {
    const [Snack, setSnack] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const storedData = localStorage.getItem("Snack");
        if (storedData && storedData.length !== 0) {
            setSnack(JSON.parse(storedData));
        } else {
            const data = await getSnackRecipes();
            if (data?.recipes) {
                localStorage.setItem("Snack", JSON.stringify(data.recipes));
                setSnack(data.recipes);
            }
        }
    }

    async function getSnackRecipes() {
        try {
            const { data } = await axios.get(
                `https://dummyjson.com/recipes/meal-type/Snack`
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
                <p>Snack Picks</p>
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
                    {Snack.map((recipe) => (
                        <SplideSlide key={recipe.id} className="splide-item">
                            <Link to={`/recipes/${recipe.id}`}>
                                <div className="card snack-card">
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
