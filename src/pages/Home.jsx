import Breakfast from "../components/Breakfast";
import Popular from "../components/Popular";
import Lunch from "../components/Lunch";
import Snack from "../components/Snack";
import Dessert from "../components/Dessert";
import SideDish from "../components/SideDish";
import Appetizer from "../components/Appetizer";
import Beverage from "../components/Beverage";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Popular />
            <Breakfast />
            <Lunch />
            <Snack />
            <Dessert />
            <SideDish />
            <Appetizer />
            <Beverage />
        </motion.div>
    );
}
