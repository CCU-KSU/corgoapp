import Select from "react-select"

const InputMulti = ({ id="a", placeholder="Make Selection", isRequired=false, label, onChange=(() => {}), options=[], value=[] }) => {

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