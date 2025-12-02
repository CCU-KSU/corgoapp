import { Link } from "react-router-dom";
import Icon_External from "../../assets/icon/external-link.svg";
import Icon_Link from "../../assets/icon/link-alt.svg";

const ButtonLink = ({ label="Link", target, isExternal=false, buttonLike=false, showIcon=true}) => {
    return (
        <>
            <Link target={isExternal? "_blank":"_self"} className={`button-link ${buttonLike? "button-small":""}`} to={target}>
                {showIcon && isExternal && <img className="button-link-external-icon" src={Icon_External} alt="" />}
                {showIcon && buttonLike && !isExternal && <img className="button-link-external-icon" src={Icon_Link} alt="" />}
                {label}
            </Link>
        </>
    );
}
 
export default ButtonLink;