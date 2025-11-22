import Icon_Search from "../../assets/icon/search.svg";
import Icon_Clear from "../../assets/icon/xmark-small.svg";
import ButtonIcon from "../button/ButtonIcon";

const Search = ({ id=(`search_${crypto.randomUUID()}`), runQuery, placeholder="Search", onChange=(() => {}), value }) => {
    const handleInputChange = (e) => {
        onChange(e.target.value); 
    };
    
    const clearQuery = () => {
        onChange("")
    }

    return (
        <>
            <div className="input-search">
                <div className="input-search-icon">
                    <img className="input-search-icon-icon" src={Icon_Search} alt="" />
                </div>
                <input className="input-search-field" type="text" id={id} name={id} placeholder={placeholder} onChange={handleInputChange} value={value}/>
                {value && <ButtonIcon
                    iconRef={Icon_Clear}
                    action={clearQuery}
                />}
            </div>
        </>
    );
}
 
export default Search;