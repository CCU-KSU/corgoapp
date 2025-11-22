import Link from "../button/Link";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Icon_User from "../../assets/icon/user.svg";
import Icon_Back from "../../assets/icon/chevron-left.svg"
import ButtonIcon from "../button/ButtonIcon"

const Header = ({ headerParams }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    return (
        <>
            <div className="header">
                {headerParams.backNav && (
                    <ButtonIcon
                        iconRef={Icon_Back}
                        action={() => {navigate(headerParams.backNav)}}
                    />
                )}
                <div className="header-label">{headerParams.headerLabel}</div>
                {headerParams.showAccount && (currentUser ? (
                    <ButtonIcon
                        iconRef={Icon_User}
                        action={() => {navigate("/profile")}}
                    />
                ) : (
                    <Link
                        target={"/login"}
                        buttonLike
                        showIcon={false}
                        label="Login"
                    />
                ))}
            </div>
        </>
    );
}
 
export default Header;