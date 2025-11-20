import Icon_Warning from "../../assets/icon/alert-circle.svg"

const Notice = ({ message, isCentered=false }) => {
    return (
        <>
            <p className={`text-notice${isCentered? " text-center":""}`}>
                <img className="text-notice-icon" src={Icon_Warning} alt="" />
                {message}
            </p>
        </>
    );
}
 
export default Notice;