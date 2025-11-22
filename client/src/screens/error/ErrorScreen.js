import BodySub from "../../components/container/BodySub";

import Link from "../../components/button/Link";

const ErrorScreen = () => {
    return (
        <>
            <BodySub>
                <div className="center-piece">
                    <h1>Something went wrong!</h1>
                    <Link
                        label={"Go back"}
                        target={"/"}
                    />
                </div>
            </BodySub> 
        </>
    );
}
 
export default ErrorScreen;