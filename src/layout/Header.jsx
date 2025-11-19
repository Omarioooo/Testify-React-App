import { Link, Outlet } from "react-router-dom";
import logo from "../images/chef_logo.png";

export default function Header() {
    return (
        <>
            <div className="header-wrapper">
                <div className="container">
                    <div className="header">
                        <div className="logo">
                            <Link to={"/"}>
                                <img src={logo} alt="logo" />
                            </Link>
                            <span>Tastify</span>
                        </div>
                        <button>Login</button>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}
