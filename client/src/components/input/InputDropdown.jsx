import Select from "react-select"

const InputDropdown = ({ id="a", placeholder="Make Selection", isRequired=false, label, onChange=(() => {}), options=[], value="" }) => {

    const handleChange = (selected) => {
        onChange(selected ? selected.key : null);
    }

    const selectedOption = options.find(option => option.key === value) || null;

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
                    value={selectedOption}
                    placeholder={placeholder}
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
 
export default InputDropdown;