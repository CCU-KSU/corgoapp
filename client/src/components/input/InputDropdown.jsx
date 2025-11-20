const Dropdown = ({ id=crypto.randomUUID(), placeholder="No Selection", isRequired=false, label, onChange=(() => {}), options=["No Options"], value }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value); 
    };
    return (
        <>
            <div className="input">
                {label && <label className="input-label" htmlFor={id}>{label}</label>}
                <select className="input-field" id={id} name={id} placeholder={placeholder} required={isRequired} onChange={handleInputChange} value={value}>
                    <option value="" disabled>{`-- ${placeholder} --`}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </>
    );
}
 
export default Dropdown;