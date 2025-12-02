import Fallback_Icon from '../../assets/icon/placeholder.svg';
import { useNavigate } from 'react-router-dom';

const CatalogItem = ({ data }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/catalog/${data.id}`);
    };

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "1rem",
                padding: "0.5rem",
                outline: "solid 2px black",
                border: "none",
                borderRadius: "0.75rem",
                maxWidth: "18rem",
                boxSizing: "border-box",
                cursor: "pointer"
            }} onClick={handleClick}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "3.5rem",
                }}>
                    <img src={data.iconRef? data.iconRef : Fallback_Icon} alt="" />
                </div>
                <div style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem"
                }}>
                    <div>
                        <strong>{data.name}</strong>
                    </div>
                    <div>
                        {data.about}
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default CatalogItem;