import { Outlet } from "react-router-dom";
import Category from "./Category";
import Search from "./Search";

export default function Layout() {
    return (
        <>
            <Search />
            <Category />
            <Outlet /> {/* Allow Nested Route */}
        </>
    );
}
