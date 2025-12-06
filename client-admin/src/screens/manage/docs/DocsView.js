import { use, useEffect, useState } from "react";
import { apiCall } from "../../../utils/api";

import ButtonLink from "../../../components/button/ButtonLink";
import Link from "../../../components/button/Link";

import SpacedItems from "../../../components/container/SpacedItems";
import LoadingGate from "../../../components/effect/LoadingGate";
import LinkListBox from "../../../components/container/LinkListBox";

const DocsView = ({ setViewParams }) => {

    const [docsLoadStatus, setDocsLoadStatus] = useState(true);
    const [docsEntries, setDocsEntries] = useState([]);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Manage Documents",
            backURL: "/manage"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchDocs = async () => {
            setDocsLoadStatus(true);
            try {
                const response = await apiCall("/docs");
                setDocsEntries(response.data);
            } catch (error) {
                console.error("Error fetching documents:", error);
            } finally {
                setDocsLoadStatus(false);
            }
        };
        fetchDocs();
    }, []);

    return (
        <>
            <LoadingGate isLoading={docsLoadStatus}>
                <SpacedItems>
                    <ButtonLink
                        label="+ Write New Document"
                        target={"editor?mode=new"}
                        buttonLike
                        showIcon={false}
                    />
                    <LinkListBox>
                        {docsEntries.map((entry) => (
                            <Link
                                key={entry.id}
                                label={entry.name}
                                target={`editor?mode=edit&id=${entry.id}`}
                            />
                        ))}
                    </LinkListBox>
                </SpacedItems>
            </LoadingGate>
        </>
    );
}
 
export default DocsView;