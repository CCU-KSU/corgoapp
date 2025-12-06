import BodySub from "../../components/container/BodySub";

import ButtonLink from "../../components/button/ButtonLink";

const ErrorScreen = () => {
    return (
        <>
            <BodySub>
                <div className="center-piece">
                    <h1>Something went wrong!</h1>
                    <p>Refresh the page or press the button below.</p>
                    <ButtonLink
                        label="Home Page"
                        target={"/catalog"}
                        buttonLike
                    />
                </div>
            </BodySub> 
        </>
    );
}
 
export default ErrorScreen;