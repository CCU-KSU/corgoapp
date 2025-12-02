import { Link } from "react-router-dom";
import { useContext } from "react";
import { NavContext } from "./NavBar";
import Icon_Placeholder from "../../assets/icon/placeholder.svg";

const NavBarItem = ({ iconRef, navTo }) => {
    const { baseUrl } =  useContext(NavContext);

    return (
        <>
            <Link className="navbar-item" to={`${baseUrl}/${navTo}`}>
                <img className="navbar-item-icon" src={iconRef? iconRef:Icon_Placeholder}/>
            </Link>
        </>
    );
}
 
export default NavBarItem;