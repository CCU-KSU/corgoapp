import Select from "react-select"

const InputDropdownNew = ({
    id = "a",
    placeholder = "Make Selection",
    isRequired = false,
    label,
    onChange = (() => {}),
    options = [],
    value = "",
    optionKey = "key",
    optionValue = "key",
    optionLabel = "label"
}) => {


    const handleChange = (selected) => {
        onChange(selected ? selected[optionValue] : null);
    };

    const selectedOption = options.find(option => option[optionValue] === value) || null;

    const getOptionValue = (option) => option[optionKey];
    const getOptionLabel = (option) => {
        if (typeof optionLabel === "string" && optionLabel.includes(".")) {
            return optionLabel.split('.').reduce((obj, key) => obj && obj[key], option);
        }
        return option[optionLabel];
    };

    return (
        <>
            <div className="input">
                {label && <label className="input-label">{label}</label>}
                <Select
                    id={id}
                    options={options}
                    getOptionValue={getOptionValue}
                    getOptionLabel={getOptionLabel}
                    onChange={handleChange}
                    value={selectedOption}
                    placeholder={placeholder}
                    required={isRequired ? true : false}
                    styles={{
                        control: ({ outline, ...provided }) => provided
                    }}
                    classNamePrefix={"input-field"}
                />
            </div>
        </>
    );
}
 
export default InputDropdownNew;