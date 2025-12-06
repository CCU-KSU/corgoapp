import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Icon_Back from "../../assets/icon/arrow-shape-turn-left.svg"
import ButtonIcon from "../button/ButtonIcon"
import ButtonLink from "../button/ButtonLink";
const Header = ({ viewParams }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    return (
        <>
            <div className="header">
                {viewParams.backURL && (
                    <ButtonIcon
                        iconRef={Icon_Back}
                        action={() => {navigate(viewParams.backURL)}}
                    />
                )}
                <h1 className="header-label">{viewParams.headerLabel}</h1>
                {!currentUser && !(window.location.pathname).includes("/login") && <ButtonLink
                    label={"Login"}
                    target={"/login"}
                    buttonLike
                    showIcon={false}
                />}
            </div>
        </>
    );
}
 
export default Header;