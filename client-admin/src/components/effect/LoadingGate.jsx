import { useEffect, useState } from "react";
import Anim_Spinner from "../../assets/anim/3-dots-scale.svg"

const LoadingGate = ({ children, isLoading }) => {

    const [isSpinnerVisible, setIsSpinnerVisible] = useState(isLoading);

    useEffect(() => {
        let timer;

        if (isLoading) {
            setIsSpinnerVisible(true);
        } else {
            timer = setTimeout(() => {
                setIsSpinnerVisible(false);
            }, 400);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isLoading]);

    return (
        <>
            {isSpinnerVisible ? (
                <div className="spinner-div">
                    <img className="spinner" alt="" src={Anim_Spinner}/>
                </div>
            ) : (
                children
            )}
        </>
    );
}
 
export default LoadingGate;