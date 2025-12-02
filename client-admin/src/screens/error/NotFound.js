import { useEffect } from "react";
import ButtonLink from "../../components/button/ButtonLink";

const NotFound = ({ setViewParams }) => {
    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            showHeader: false,
            headerLabel: "",
            backURL: "/catalog",
            showNavBar: false
        }));
    }, [setViewParams]);

    return (
        <>
            <div className="center-piece">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <ButtonLink
                    label="Main Menu"
                    target={"/"}
                    buttonLike
                />
            </div>
        </>
    );
}
 
export default NotFound;