import { useState, useEffect, useRef } from "react";
import { apiCall } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

import InputMulti from "../../components/input/InputMulti";
import SpacedItems from "../../components/container/SpacedItems";

import LoadingGate from "../../components/effect/LoadingGate";
import CatalogItem from "../../components/misc/CatalogItem";
import PagedList from "../../components/container/PagedList";

import ButtonLink from "../../components/button/ButtonLink";

const Feed = ({ setViewParams }) => {
    const { currentUser } = useAuth();
    const timerRef = useRef();

    const [goalTerms, setGoalTerms] = useState([]);
    const [goalTermOptions, setGoalTermOptions] = useState([]);
    const [searchDisabled, setSearchDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [pageData, setPageData] = useState({ catalogPageRaw: [], more: false, nextIndex: null });

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            showHeader: true,
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
                let resProfile_ = { data: { goals: [] } };
                if (currentUser) {
                    const resProfile =  await apiCall("/users/profile");
                    if (resProfile.data && resProfile.data.goals) {
                        setGoalTerms(resProfile.data.goals);
                        resProfile_ = resProfile;
                    }
                }
                const resCatalog = await apiCall(`/catalog?index=${initialIndex}&goals=${resProfile_.data.goals.join(",")}`);
                const resGoals = await apiCall("/metadata/goals");
                setPageData(resCatalog.data); 
                setGoalTermOptions(resGoals.data);               
            } catch (error) {
                console.error("Catalog fetching failed:", error);
                setError(true);
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
            const res = await apiCall(`/catalog?index=${pageData.nextIndex}&goals=${goalTerms.join(",")}`);
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

    const onGoalTermsUpdate = (newTerms) => {
    setGoalTerms(newTerms);
    if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            saveGoalTerms(newTerms);
    }, 1000);
    };

    const saveGoalTerms = async (terms) => {
        setInitializing(true);
        try {
            await apiCall("/users/profile-update", {
                method: "PATCH",
                body: {
                    goals: terms
                }
            });
            // Reload catalog based on new goals
            const resCatalog = await apiCall(`/catalog?index=${Date.now()}&goals=${terms.join(",")}`);
            setPageData({
                catalogPageRaw: resCatalog.data.catalogPageRaw,
                more:  resCatalog.data.more,
                nextIndex: resCatalog.data.nextIndex
            });               
        } catch (error) {
            console.error("Failed to save goal terms:", error);
        } finally {
            setInitializing(false);
        }
    };

    return (
        <>
            <LoadingGate isLoading={initializing} isError={error}>
                <SpacedItems>
                    <InputMulti
                        label={"Start Here! What are your Goals?"}
                        options={goalTermOptions}
                        value={goalTerms}
                        onChange={onGoalTermsUpdate}
                        isDisabled={searchDisabled}
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