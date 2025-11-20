const Button = ({ label="Button", type="button", action=(() => {}), isSmall=false, disabled=false } ) => {
    return (
        <>
            <button className={`button${isSmall? "-small":""} hover roboto-regular`} type={type} onClick={action} disabled={disabled} >{label}</button>
        </>
    );
}
 
export default Button;