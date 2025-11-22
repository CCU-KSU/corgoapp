import Icon_Placeholder from "../../assets/icon/placeholder.svg";

const ButtonIcon = ({ iconRef=Icon_Placeholder, label, type="button", action=(() => {}), hasBorder=false }) => {
    return (
        <>
            <button className={`button-icon${hasBorder? "-w-border":""} hover`} aria-label={label} type={type} onClick={action}>
                <img src={iconRef} className="button-icon-icon" alt="" />
            </button>
        </>
    );
}
 
export default ButtonIcon;