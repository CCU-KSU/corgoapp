import Spinner from "./Spinner";

const LoadingGate = ({ children, isLoading }) => {
    return (
        <>
            {isLoading ? (<Spinner/>) : (
                <div>
                    {children}
                </div>
            )}
        </>
    );
}
 
export default LoadingGate;