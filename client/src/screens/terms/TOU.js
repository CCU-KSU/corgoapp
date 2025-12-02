import { useEffect, useState } from "react";
import { apiCall } from "../../utils/api";

import ReactMarkdown from "react-markdown";

import Button from "../../components/button/Button";
import LoadingGate from "../../components/effect/LoadingGate";

const TOU = ({ setViewParams }) => {

    const [tou, setTou] = useState(null);
    const [touLoading, setTouLoading] = useState(true);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            show: false
        }));
    }, [setViewParams]);

    useEffect(() => {
        const getTou = async () => {
            setTouLoading(true);
            try {
                const touGet = await apiCall("/docs/tou");
                setTou(touGet.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTouLoading(false);
            }
        };

        getTou();
    }, []);

    return (
        <>
            <div>
                <LoadingGate isLoading={touLoading}>
                    <ReactMarkdown>
                        {tou && tou.content}
                    </ReactMarkdown>
                    <div className="center-piece">
                        <Button
                            label="Go Back"
                            action={() => {window.close()}}
                            isSmall
                        />
                    </div>
                </LoadingGate>
            </div>
        </>
    );
}
 
export default TOU;