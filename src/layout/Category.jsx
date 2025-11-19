import { FaPizzaSlice, FaPepperHot } from "react-icons/fa";
import { GiBowlOfRice, GiSushis, GiTacos } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Category() {
    const location = useLocation();
    const navigator = useNavigate();

    const handleClick = (e, path) => {
        if (path === location.pathname) {
            e.preventDefault();
            navigator("/");
        }
    };
    return (
        <div className="categories">
            <div className="container">
                <div className="list">
                    <NavLink
                        to={"/tag/Asian"}
                        className={({ isActive }) => (isActive ? "tag-link active" : "tag-link")}
                        onClick={(e) => handleClick(e, "/tag/Asian")}
                    >
                        <GiBowlOfRice className="icon" />
                        <h4>Asian Food</h4>
                    </NavLink>
                    <NavLink
                        to={"/tag/Indian"}
                        className={({ isActive }) => (isActive ? "tag-link active" : "tag-link")}
                        onClick={(e) => handleClick(e, "/tag/Indian")}
                    >
                        <FaPepperHot className="icon" />
                        <h4>Indian Food</h4>
                    </NavLink>
                    <NavLink
                        to={"/tag/Italian"}
                        className={({ isActive }) => (isActive ? "tag-link active" : "tag-link")}
                        onClick={(e) => handleClick(e, "/tag/Italian")}
                    >
                        <FaPizzaSlice className="icon" />
                        <h4>Italian Food</h4>
                    </NavLink>
                    <NavLink
                        to={"/tag/Japanese"}
                        className={({ isActive }) => (isActive ? "tag-link active" : "tag-link")}
                        onClick={(e) => handleClick(e, "/tag/Japanese")}
                    >
                        <GiSushis className="icon" />
                        <h4>Japanese Food</h4>
                    </NavLink>
                    <NavLink
                        to={"/tag/Mexican"}
                        className={({ isActive }) => (isActive ? "tag-link active" : "tag-link")}
                        onClick={(e) => handleClick(e, "/tag/Mexican")}
                    >
                        <GiTacos className="icon" />
                        <h4>Mexican Food</h4>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
