import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../../utils/api";
import { useSearchParams } from "react-router-dom";

import Input from "../../../components/input/Input";
import InputBox from "../../../components/input/InputBox";
import InputDropdown from "../../../components/input/InputDropdown";
import InputMulti from "../../../components/input/InputMulti";
import Button from "../../../components/button/Button";
import ButtonIcon from "../../../components/button/ButtonIcon";
import ButtonLink from "../../../components/button/ButtonLink";

import Form from "../../../components/form/Form";
import Message from "../../../components/text/Message";

import LoadingGate from "../../../components/effect/LoadingGate";
import BodySub from "../../../components/container/BodySub";
import SplitView from "../../../components-admin/container/SplitView";

import Place_Holder_Icon from "../../../assets/icon/placeholder.svg";
import Trash_Icon from "../../../assets/icon/trash.svg";

import Modal from "react-modal";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import SpacedItems from "../../../components/container/SpacedItems";

Modal.setAppElement('#root');

const CatalogEdit = ({ setViewParams }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const [isEmbeddingHelpOpen, setIsEmbeddingHelpOpen] = useState(false);

    const [editorPrepStatus, setEditingPrepStatus] = useState(true);
    const [workingEntry, setWorkingEntry] = useState({
        about: "",
        aboutLong: "",
        iconRef: "",
        name: "",
        installLink: {},
        relatedGoals: []
    });
    const [isSaved, setIsSaved] = useState(true);

    const [goalOptions, setGoalOptions] = useState([]);
    const [platformOptions, setPlatformOptions] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const [operationMessage, setOperationMessage] = useState({
        type: "",
        message: ""
    });

    useEffect(() => {
        setIsSaved(false);
    }, [workingEntry]);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Entry Editor",
            backURL: "/manage/catalog"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchMetadataOptions = async () => {
            try {
                setEditingPrepStatus(true);
                const resGoals = await apiCall("/metadata/sets/goals?asArray=true&sortBy=pos&desc=false");
                const resPlatforms = await apiCall("/metadata/sets/platforms?asArray=true&sortBy=pos&desc=false");
                setGoalOptions(resGoals.data.setData);
                setPlatformOptions(resPlatforms.data.setData);
            } catch (error) {
                console.error("Error fetching metadata options:", error);
            } finally {
                setEditingPrepStatus(false);
            }
        };

        const fetchCatalogEntry = async (id) => {
            setEditingPrepStatus(true);
            try {
                const response = await apiCall(`/catalog/${id}`);
                setWorkingEntry(response.data);                
            } catch (error) {
                console.error("Error fetching catalog entry:", error);
            } finally {
                setEditingPrepStatus(false);
            }
        };

        if (paramsObject.mode === "edit" && paramsObject.id) {
            fetchCatalogEntry(paramsObject.id);
        } else {
            loadBlank();
        }
        fetchMetadataOptions();
    }, [paramsObject.mode, paramsObject.id]);

    const loadBlank = () => {
        console.log("Blank Loaded");
        
    };

    const createEntry = async () => {
        setEditingPrepStatus(true);
        try {
            const res = await apiCall("/catalog/create",{
                method: "POST",
                body: workingEntry
            });
            setOperationMessage({
                type: (res.success ? "success" : "error"),
                message: res.message || (res.status === 201 ? "Catalog entry created successfully." : "Failed to create catalog entry.")
            });
        } catch (error) {
            console.error("Error creating catalog entry:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to create catalog entry. Please try again."
            });
        } finally {
            setEditingPrepStatus(false);
            navigate("/manage/catalog");
        }
    };

    const updateEntry = async () => {
        const refetchEntry = async () => {
            try {
                const response = await apiCall(`/catalog/${paramsObject.id}`);
                setWorkingEntry(response.data);                
            } catch (error) {
                console.error("Error fetching catalog entry:", error);
            }
        };

        setEditingPrepStatus(true);
        try {
            const res = await apiCall(`/catalog/${paramsObject.id}`,{
                method: "PATCH",
                body: workingEntry
            });
            setOperationMessage({
                type: (res.success ? "success" : "error"),
                message: res.message || (res.status === 200 ? "Catalog entry updated successfully." : "Failed to update catalog entry.")
            });
        } catch (error) {
            console.error("Error updating catalog entry:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to update catalog entry. Please try again."
            });
        } finally {
            setEditingPrepStatus(false);
            setIsSaved(true);
            await refetchEntry();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paramsObject.mode === "new") {
            await createEntry();
        } else if (paramsObject.mode === "edit") {
            await updateEntry();
        }
    };

    const deleteEntry = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this catalog entry? This action cannot be undone.");
        if (!confirmDelete) return;
        setEditingPrepStatus(true);
        try {
            const res = await apiCall(`/catalog/${paramsObject.id}`,{
                method: "DELETE"
            });
            setOperationMessage({
                type: (res.success ? "success" : "error"),
                message: res.message || (res.status === 200 ? "Catalog entry deleted successfully." : "Failed to delete catalog entry.")
            });
            navigate("/manage/catalog");
        } catch (error) {
            console.error("Error deleting catalog entry:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to delete catalog entry. Please try again."
            });
        } finally {
            setEditingPrepStatus(false);
            navigate("/manage/catalog");
        }
    };

    return (
        <>
            <LoadingGate isLoading={editorPrepStatus}>
                <SplitView>
                    <div className="left-pane">
                        <Form onSubmit={handleSubmit}>
                            {operationMessage.message && (
                                <Message
                                    type={operationMessage.type}
                                    message={operationMessage.message}
                                    isCentered
                                />
                            )}
                            <Input
                                id="name"
                                label="App Name"
                                value={workingEntry.name}
                                onChange={(val) => setWorkingEntry({...workingEntry, name: val})}
                                isRequired
                                placeholder="Name of the application."
                            />
                            <InputMulti
                                id="relatedGoals"
                                label="Related Goals"
                                options={goalOptions}
                                isRequired
                                value={workingEntry.relatedGoals}
                                onChange={(vals) => setWorkingEntry({...workingEntry, relatedGoals: vals})}
                            />
                            <InputBox
                                id="about"
                                label="Short Description"
                                value={workingEntry.about}
                                onChange={(val) => setWorkingEntry({...workingEntry, about: val})}
                                isRequired
                                placeholder="A brief description of the app."
                            />
                            <Message isCentered type="notice" message="See 'Content Embedding Help'"/>
                            
                            <SpacedItems direction="row">
                                <Input
                                    id="iconRef"
                                    label="Icon Reference (URL)"
                                    placeholder="Image Url"
                                    value={workingEntry.iconRef}
                                    onChange={(val) => setWorkingEntry({...workingEntry, iconRef: val})}
                                    isRequired
                                />
                               <img src={workingEntry.iconRef || Place_Holder_Icon} alt="" style={{height: "3rem", aspectRatio: "1/1"}}/> 
                            </SpacedItems>
                            
                            <InputBox
                                id="aboutLong"
                                label="Long Description"
                                value={workingEntry.aboutLong}
                                onChange={(val) => setWorkingEntry({...workingEntry, aboutLong: val})}
                                isRequired
                                placeholder="A detailed description of the app. Supports Markdown formatting."
                            />
                            <ButtonLink
                                label="Markdown Help"
                                target={"https://www.markdownguide.org/cheat-sheet/"}
                                buttonLike
                                isExternal
                            />
                            <Button
                                label="Content Embedding Help"
                                action={() => setIsEmbeddingHelpOpen(true)}
                                isSmall
                            />
                            <SpacedItems direction="row">
                                <InputDropdown
                                    id="installPlatform"
                                    label="Platform"
                                    options={platformOptions}
                                    value={selectedPlatform}
                                    onChange={(val) => {
                                        setSelectedPlatform(val);
                                    }}
                                    placeholder="Platform"
                                />
                                <Input
                                    id="installLink"
                                    label="Install Link"
                                    placeholder="No link provided"
                                    value={
                                        selectedPlatform && workingEntry.installLink && workingEntry.installLink[selectedPlatform]
                                            ? workingEntry.installLink[selectedPlatform].link || ""
                                            : ""
                                    }
                                    onChange={(val) => setWorkingEntry({
                                        ...workingEntry,
                                        installLink: {
                                            ...workingEntry.installLink,
                                            [selectedPlatform]: {
                                                ...(workingEntry.installLink && workingEntry.installLink[selectedPlatform] ? workingEntry.installLink[selectedPlatform] : {}),
                                                link: val
                                            }
                                        }
                                    })}
                                />
                            </SpacedItems>
                            {operationMessage.message && (
                                <Message
                                    type={operationMessage.type}
                                    message={operationMessage.message}
                                    isCentered
                                />
                            )}
                            <SpacedItems direction="row">
                                <Button
                                    label={paramsObject.mode === "new" ? "Create Entry" : "Update Entry"}
                                    type="submit"
                                />
                                {paramsObject.mode === "edit" && <ButtonIcon
                                    iconRef={Trash_Icon}
                                    action={deleteEntry}
                                    hasBorder
                                />}
                            </SpacedItems>
                                
                        </Form>
                    </div>
                    <div className="right-pane">
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                            {workingEntry.aboutLong}
                        </ReactMarkdown>
                    </div>
                </SplitView>
            </LoadingGate>
            <Modal isOpen={isEmbeddingHelpOpen} onRequestClose={() => setIsEmbeddingHelpOpen(false)} contentLabel="Markdown Help">
                <BodySub>
                    <Button
                        label="Close"
                        action={() => setIsEmbeddingHelpOpen(false)}
                        isSmall
                    />
                    <ReactMarkdown>
                        {`# Content Embedding Help\n## Videos\n1. Obtain the embed code from the content provider (e.g., YouTube, Vimeo).\n2. Copy the iframe code snippet provided.\n3. Paste the iframe code directly into the Markdown content where you want it to appear.\n4. Where you see items such as \`width="965"\` and \`height="543"\`, remove them. Then place \`style="width: 100%; aspect-ratio: 16/9;"\` after the \`iframe\` text at the beginning\n\n### Example: For a Youtube Video\n\n\`<iframe style="width: 100%; aspect-ratio: 16/9;" src="https://www.youtube.com/embed/wDchsz8nmbo" title="1 Minute Sample Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>\`\n\n## App Icons\n\n1. Find a suitable image for the app icon (preferably square).\n2. Obtain a direct URL to the image (Can be done by right clicking the image ans selecting \`Copy Image Address\`.\n3. Use the direct URL in the "Icon Reference (URL)" field when editing the catalog entry.\n\n## Notes\n- Ensure that any embedded content complies with copyright and usage rights.\n`}
                    </ReactMarkdown>

                </BodySub>
            </Modal>
        </>
    );
}
 
export default CatalogEdit;