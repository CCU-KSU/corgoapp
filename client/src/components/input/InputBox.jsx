const InputBox = ({ id="a", placeholder="Text Box Field", isRequired=false, label, onChange=(() => {}), value, isMono=false }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value); 
    };
    return (
        <>
            <div className="input">
                {label && <label className="input-label" htmlFor={id}>{label}</label>}
                <textarea className={`input-box${isMono? "":" roboto-regular"}`} name={id} id={id} placeholder={placeholder} required={isRequired} onChange={handleInputChange} value={value} ></textarea>
            </div>
        </>
    );
}
 
export default InputBox;