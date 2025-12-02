import { useNavigate } from "react-router-dom";

import Icon_Back from "../../assets/icon/arrow-shape-turn-left.svg"
import ButtonIcon from "../button/ButtonIcon"

const Header = ({ viewParams }) => {
    const navigate = useNavigate();
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
            </div>
        </>
    );
}
 
export default Header;