import Tag from "./Tag";
import Home from "./Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Layout from "../layout/Layout";
import { AnimatePresence } from "framer-motion";
import Header from "../layout/Header";

export default function Pages() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/tag/:tag" element={<Tag />} />
                    <Route path="/search" element={<Searched />} />
                </Route>
                <Route path="/recipes/:id" element={<Recipe />} />
            </Routes>
        </AnimatePresence>
    );
}
