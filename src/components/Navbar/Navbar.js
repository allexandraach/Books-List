import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <>
            <nav>
                <h1>MY BOOKS</h1>
                <div className="linksWrapper">
                    <Link to="/"> Home </Link> 
                    <Link to="/add"> Add a new book </Link>
                </div>
            </nav>
        </>)

};


