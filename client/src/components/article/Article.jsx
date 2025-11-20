import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Article = ({ setViewParams }) => {

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            showHeader: false,
            showNavBar: false
        }));
    }, [setViewParams]);

    const { id } = useParams();

    return (
        <p>{id}</p>
    );
}
 
export default Article;