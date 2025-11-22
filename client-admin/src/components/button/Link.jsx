import { Link as A } from "react-router-dom";
import Icon_External from "../../assets/icon/external-link.svg";
import Icon_Link from "../../assets/icon/link-alt.svg";

const Link = ({ label="Link", target, isExternal=false, buttonLike=false, showIcon=true}) => {
    return (
        <>
            <A target={isExternal? "_blank":"_self"} className={`button-link ${buttonLike? "button-small":""}`} to={target}>
                {showIcon && isExternal && <img className="button-link-external-icon" src={Icon_External} alt="" />}
                {showIcon && buttonLike && !isExternal && <img className="button-link-external-icon" src={Icon_Link} alt="" />}
                {label}
            </A>
        </>
    );
}
 
export default Link;