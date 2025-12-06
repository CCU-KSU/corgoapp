import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/api";

import ButtonLink from "../../../components/button/ButtonLink";
import Link from "../../../components/button/Link";

import SpacedItems from "../../../components/container/SpacedItems";
import LoadingGate from "../../../components/effect/LoadingGate";
import LinkListBox from "../../../components/container/LinkListBox";

const CatalogView = ({ setViewParams }) => {
    const [catalogLoadStatus, setCatalogLoadStatus] = useState(true);
    const [catalogEntries, setCatalogEntries] = useState([]);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Manage Catalog",
            backURL: "/manage"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchCatalog = async () => {
            setCatalogLoadStatus(true);
            try {
                const response = await apiCall("/catalog");
                setCatalogEntries(response.data);
            } catch (error) {
                console.error("Error fetching catalog:", error);
            } finally {
                setCatalogLoadStatus(false);
            }
        };
        fetchCatalog();
    }, []);

    return (
        <>
            <LoadingGate isLoading={catalogLoadStatus}>
                <SpacedItems>
                    <ButtonLink
                        label="+ Create New Catalog Entry"
                        target={"editor?mode=new"}
                        buttonLike
                        showIcon={false}
                    />
                    <LinkListBox>
                        {catalogEntries.map((entry) => (
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
 
export default CatalogView;