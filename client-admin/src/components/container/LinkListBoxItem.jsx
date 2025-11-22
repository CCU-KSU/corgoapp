import { Link as A } from "react-router-dom";
const ListBoxItem = ({ label="Label", path="/" }) => {
    return (
        <A className="link-list-box-item" to={path}>
            {label}
        </A>
    );
}
 
export default ListBoxItem;