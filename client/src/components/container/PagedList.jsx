import { useState } from "react";

const PagedList = ({ component, apiRoute, query, defaultQuery, itemsPerPage=10 }) => {
    const [listItems, setListItems] = useState([]);

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const li = await apiCall(apiRoute); // Plus query | defaultQuery if query is empty 
                setListItems(li);
            } catch (error) {
                console.error(error);
            }
        }
        fetchListItems()
    }, [apiRoute, query, defaultQuery]);

    // Page control logic here

    return (
        <>
            <div className="paged-list">
                {listItems.map((li) => {
                    // component prop here with "li" as a prop
                })}
            </div>
            {/* Page controls */}
        </>
    );
}
 
export default PagedList;