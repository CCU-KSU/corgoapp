import Link from "../../components/button/Link";

const NotFound = () => {
    return (
        <>
            <div className="center-piece">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <Link
                    label="Home Page"
                    target={"/catalog"}
                    buttonLike
                />
            </div>
        </>
    );
}
 
export default NotFound;