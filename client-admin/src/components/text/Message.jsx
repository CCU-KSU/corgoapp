import Icon_Warning from "../../assets/icon/alert-circle.svg";
import Icon_Error from "../../assets/icon/xmark-circle-red.svg";
import Icon_Check from "../../assets/icon/checkmark-circle.svg";
import Icon_Info from "../../assets/icon/info-circle.svg";
import { useEffect, useState } from "react";

const Message = ({ type="notice", message="", isCentered=false }) => {

    const [selectedMode, setSelectedMode] = useState({});

    useEffect(() => {
        const mode = {
            notice: {
                icon: Icon_Info,
                style: {
                    color: "black"
                }
            },
            error: {
                icon: Icon_Error,
                style: {
                    color: "red"
                }
            },
            warning: {
                icon: Icon_Warning,
                style: {
                    color: "orange"
                }
            },
            success: {
                icon: Icon_Check,
                style: {
                    color: "#178a00"
                }
            },
        }

        const selectedType = mode[type];
        if (selectedType) {
            setSelectedMode(selectedType);
        } else {
            setSelectedMode(mode["notice"]);
        }
    }, [type]);



    return (
        <>
            {message && (
                <p className={`text-message${isCentered? " text-center":""}`} style={selectedMode.style}>
                    <img src={selectedMode.icon} alt="" className="text-message-icon" />
                    {message}
                </p>
            )}
        </>
    );
}
 
export default Message;