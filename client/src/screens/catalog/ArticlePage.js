import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiCall } from "../../utils/api";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import LoadingGate from "../../components/effect/LoadingGate";
import SpacedItems from "../../components/container/SpacedItems";
import ButtonLink from "../../components/button/ButtonLink";

const ArticlePage = ({ setViewParams }) => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState({
        installLink: {}, //Has more than one link
        edited: 0,
        iconRef: "",
        name: "",
        about: "",
        relatedGoals: [],
        checklistCollection: {},
        written: 0,
        aboutLong: ""
    });
    const [tags, setTags] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [contentLoading, setContentLoading] = useState(true);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "",
            backURL: "/catalog",
            showNavBar: false
        }));
    }, [setViewParams]);

    useEffect(() => {
        const loadContent = async () => {
            setContentLoading(true);
            try {
                const resContent = await apiCall(`/catalog/${itemId}`);
                if (!resContent.data) {
                    navigate("/not-found");
                    return;
                }
                const resGoals = await apiCall("/metadata/goals");
                const resPlatforms = await apiCall("/metadata/platforms");
                const goalsMap = {};
                resGoals.data.forEach(goal => {
                    goalsMap[goal.key] = goal.label;
                });
                
                setContent(resContent.data);
                setPlatforms(resPlatforms.data);
                setTags(goalsMap);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setContentLoading(false);
            }
        };

        loadContent();
    }, [navigate, itemId]);

    return (
        <>
            <LoadingGate isLoading={contentLoading}>
                <SpacedItems>
                    <div className="article-header">
                        <img className="article-header-icon" src={content.iconRef} alt="" />
                        <div className="article-header-label">
                            <h1>{content.name}</h1>
                        </div>
                    </div>
                    <div className="article-tags">
                        {content.relatedGoals.map((goalId) => (
                            <span key={goalId} className="article-tag">
                                {tags[goalId]}
                            </span>
                        ))}
                    </div>
                    <div className="article-body">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {content.aboutLong}
                        </ReactMarkdown>
                    </div>
                    <div className="article-install-links">
                        <h2 className="no-spacing">Install</h2>
                        {Object.entries(content.installLink).map(([platformKey, linkData]) => {
                            const platform = platforms.find(p => p.key === platformKey);
                            return platform ? (
                                <ButtonLink
                                    key={platformKey}
                                    label={platform.label}
                                    target={linkData.link}
                                    isExternal={true}
                                    buttonLike
                                />
                            ) : null;
                        })}
                    </div>
                </SpacedItems>
            </LoadingGate>
        </>
    );
}
 
export default ArticlePage;