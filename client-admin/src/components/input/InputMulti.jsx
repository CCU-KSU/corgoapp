import Select from "react-select"

const Dropdown = ({ id=crypto.randomUUID(), placeholder="No Selection", isRequired=false, label, onChange=(() => {}), options=["No Options"], value=[] }) => {
    const handleInputChange = (m) => {
        onChange(m.map(obj => obj.value)); 
    };
    return (
        <>
            <div className="input">
                {label && <label className="input-label">{label}</label>}
                <Select
                    id={id}
                    options={options.map(item => ({
                        value: item,
                        label: item
                    }))}
                    styles={{
                        control: ({ outline, ...provided }) => provided // Removes baked in `outline` from the styling
                    }}
                    isMulti
                    placeholder={`-- ${placeholder} --`}
                    closeMenuOnSelect={false}
                    required={isRequired? true : false}
                    onChange={handleInputChange}
                    value={value.map(item => ({
                        value: item,
                        label: item
                    }))}
                    classNamePrefix={"input-field"}
                />
            </div>
        </>
    );
}
 
export default Dropdown;