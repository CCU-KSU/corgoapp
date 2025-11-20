import Icon_Error from "../../assets/icon/xmark-circle-red.svg"

const Notice = ({ message, isCentered=false }) => {
    return (
        <>
            <p className={`text-error${isCentered? " text-center":""}`}>
                <img className="text-notice-icon" src={Icon_Error} alt="" />
                {message}
            </p>
        </>
    );
}
 
export default Notice;