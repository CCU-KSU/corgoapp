import Select from "react-select"

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const InputMulti = ({ id=generateId(), placeholder="Make Selection", isRequired=false, label, onChange=(() => {}), options=[], value=[] }) => {

    const handleChange = (selected) => {
        onChange(selected.map(option => option.key));
    }

    const selectedOptions = options.filter(option => value.includes(option.key));
    
    return (
        <>
            <div className="input">
                {label && <label className="input-label">{label}</label>}
                <Select
                    id={id}
                    options={options}
                    getOptionValue={(options) => options.key}
                    getOptionLabel={(options) => options.label}
                    onChange={handleChange}
                    value={selectedOptions}
                    placeholder={placeholder}
                    isMulti
                    closeMenuOnSelect={false}
                    required={isRequired? true : false}
                    styles={{
                        control: ({ outline, ...provided }) => provided // Removes baked in `outline` from the styling
                    }}
                    classNamePrefix={"input-field"}
                />
            </div>
        </>
    );
}
 
export default InputMulti;