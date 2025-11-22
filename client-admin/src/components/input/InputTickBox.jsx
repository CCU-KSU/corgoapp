const InputTickBox = ({ id=crypto.randomUUID(), type="checkbox", isRequired=false, label, onChange=(() => {}), value }) => {
    const handleInputChange = (e) => {
        onChange(e.target.checked);
    };

    if (!["radio", "checkbox"].includes(type)) {
        return (
            <>
                <p>{"!!! Invalid type for this Component !!!"}</p>
            </>
        )
    }

    return (
        <>
            <div className="input-tick">
                <input className="input-tick-box" id={id} name={id} type={type} required={isRequired} onChange={handleInputChange} checked={value} />
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    );
}
 
export default InputTickBox;