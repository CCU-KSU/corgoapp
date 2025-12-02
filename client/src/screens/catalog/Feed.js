import { useState, useEffect } from "react";
import { apiCall } from "../../utils/api";

import InputMulti from "../../components/input/InputMulti";
import SpacedItems from "../../components/container/SpacedItems";

import LoadingGate from "../../components/effect/LoadingGate";
import CatalogItem from "../../components/misc/CatalogItem";
import PagedList from "../../components/container/PagedList";

const Feed = ({ setViewParams }) => {

    const [goalTerms, setGoalTerms] = useState("");
    const [goalTermOptions, setGoalTermOptions] = useState([]);
    const [searchDisabled, setSearchDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);
    const [pageData, setPageData] = useState({ catalogPageRaw: [], more: false, nextIndex: null });

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Catalog",
            backURL: "",
            showNavBar: true
        }));
    }, [setViewParams]);

    useEffect(() => {
        const initialIndex = Date.now();
        const initialLoad = async () => {
            setInitializing(true);
            setLoading(true);
            setSearchDisabled(true);
            try {
                const res = await apiCall(`/catalog?index=${initialIndex}`);
                const resGoals = await apiCall("/metadata/goals");
                setPageData(res.data); 
                setGoalTermOptions(resGoals.data);               
            } catch (error) {
                console.error("Catalog fetching failed:", error);
            } finally {
                setLoading(false);
                setInitializing(false);
                setSearchDisabled(false);
            }
        }
        initialLoad();
    }, []);

    const loadMore = async () => {
        setLoading(true);
        try {
            const res = await apiCall(`/catalog?index=${pageData.nextIndex}`);
            setPageData(curr => ({
                catalogPageRaw: [...curr.catalogPageRaw, ...res.data.catalogPageRaw],
                more:  res.data.more,
                nextIndex: res.data.nextIndex
            }));
        } catch (error) {
            console.error("Catalog fetching failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoadingGate isLoading={initializing}>
                <SpacedItems>
                    <InputMulti
                        label={"Start Here! What are your Goals?"}
                        options={goalTermOptions}
                        value={goalTerms}
                        onChange={setGoalTerms}
                        disabled={searchDisabled}
                    />
                    <PagedList
                        ItemComponent={CatalogItem}
                        pageItems={pageData.catalogPageRaw}
                        loadMore={loadMore}
                        loading={loading}
                        isMore={pageData.more}
                    />
                </SpacedItems>
            </LoadingGate>

        </>
    );
}
 
export default Feed;