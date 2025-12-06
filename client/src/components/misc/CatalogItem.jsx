import Fallback_Icon from "../../assets/icon/placeholder.svg";
import { Link } from "react-router-dom";

const CatalogItem = ({ data }) => {    
    return (
        <>
            <Link to={`/catalog/${data.id}`} style={{
                textDecoration: "none",
                color: "inherit",
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
            }} >
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
            </Link>
        </>
    );
}
 
export default CatalogItem;