const Input = ({ id=crypto.randomUUID(), type="text", placeholder="Text Field", isRequired=false, label, onChange=(() => {}), min, max, autoComplete, value }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value); 
    };

    if (!["email", "number", "password", "text", "search"].includes(type)) {
        return (
            <>
                <p>{"!!! Invalid type for this Component !!!"}</p>
            </>
        )
    }

    return (
        <>
            <div className="input">
                {label && <label className="input-label" htmlFor={id}>{label}</label>}
                <input className="input-field" id={id} name={id} type={type} placeholder={placeholder} required={isRequired} onChange={handleInputChange} min={min} max={max} autoComplete={autoComplete} value={value} />
            </div>
        </>
    );
}
 
export default Input;