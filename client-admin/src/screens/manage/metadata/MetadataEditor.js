import { useState, useEffect } from "react";
import { apiCall } from "../../../utils/api";

import Trash_Icon from "../../../assets/icon/trash.svg";

import Button from "../../../components/button/Button";
import ButtonIcon from "../../../components/button/ButtonIcon";
import Input from "../../../components/input/Input";
import InputDropdown from "../../../components/input/InputDropdown";
import InputDropdownNew from "../../../components/input/InputDropdownNew";

import Form from "../../../components/form/Form";
import SpacedItems from "../../../components/container/SpacedItems";
import LoadingGate from "../../../components/effect/LoadingGate";

import Message from "../../../components/text/Message";

const MetadataEditor = ({ setViewParams }) => {

    const [loadingMetadata, setLoadingMetadata] = useState(true);
    const [loadingSet, setLoadingSet] = useState(false);
    const [metadataSetList, setMetadataSetList] = useState([]);
    const [workingSet, setWorkingSet] = useState({});
    const [operationMessage, setOperationMessage] = useState({
        type: "",
        message: ""
    });

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Metadata Editor",
            backURL: "/manage"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchMetadataSets = async () => {
            setLoadingMetadata(true);
            try {
                const response = await apiCall("/metadata/sets");
                setMetadataSetList(response.data);                
            } catch (error) {
                console.error("Error fetching metadata sets:", error);
            } finally {
                setLoadingMetadata(false);
            }
        };

        fetchMetadataSets();
    }, []);

    const onWorkingSetChange = async (setId) => {
        setWorkingSet({ id: setId }); // Set id immediately for dropdown value
        setLoadingSet(true);
        try {

            const response = await apiCall(`/metadata/sets/${setId}`);
            setWorkingSet({
                id: setId,
                setName: response.data.setName,
                setData: response.data.setData
            });            
        } catch (error) {
            console.error("Error fetching metadata set details:", error);
        } finally {
            setLoadingSet(false);
        }
    };

    const handleLabelChange = (key, val) => {
        setWorkingSet(prev => ({
            ...prev,
            setData: {
                ...prev.setData,
                [key]: {
                    ...prev.setData[key],
                    label: val
                }
            }
        }));
    };

    const handleRemoveItem = (key) => {
        setWorkingSet(prev => {
            const newSetData = { ...prev.setData };
            delete newSetData[key];
            return {
                ...prev,
                setData: newSetData
            };
        });
    };

    const handleAddNewItem = () => {
        let newId;
        do {
            newId = Math.random().toString(36).substring(2, 7) + Date.now().toString(36);
        } while (workingSet.setData && workingSet.setData[newId]);
        setWorkingSet(prev => ({
            ...prev,
            setData: {
                ...prev.setData,
                [newId]: { label: "" }
            }
        }));
    };

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        try {
            await apiCall(`/metadata/sets/${workingSet.id}`, {
                method: "PUT",
                body: {
                    setData: workingSet.setData
                }
            });
            setOperationMessage({
                type: "success",
                message: "Metadata set saved successfully."
            });
        } catch (error) {
            alert("Failed to save metadata set: " + error.message);
        }
    };

    return (
        <>
            <LoadingGate isLoading={loadingMetadata}>
                <SpacedItems>
                    {operationMessage.message && <Message type={operationMessage.type} message={operationMessage.message} />}
                    <InputDropdownNew
                        id="metadata-set-selector"
                        label="Select Metadata Set to Edit"
                        options={metadataSetList}
                        value={workingSet.id || ""}
                        onChange={onWorkingSetChange}
                        optionKey="id"
                        optionValue="id"
                        optionLabel="setName"
                        placeholder="Select a Metadata Set"
                    />
                    <LoadingGate isLoading={loadingSet}>
                        <SpacedItems direction="column" gap={"1rem"}>
                            {workingSet.id && <Message type="info" message="Edit, Add, or Delete the labels for the selected metadata set. When you are done, click 'Save Changes' to update the metadata set." />}
                            <Form onSubmit={handleSaveChanges}>
                                {workingSet.setData && Object.entries(workingSet.setData).map(([key, data]) => (
                                    <SpacedItems key={key} direction="row" gap={"0.5rem"}>
                                        <Input
                                            id={`metadata-key-${key}`}
                                            value={data.label || ""}
                                            onChange={(val) => handleLabelChange(key, val)}
                                            isRequired
                                        />
                                        <ButtonIcon
                                            iconRef={Trash_Icon}
                                            hasBorder
                                            action={() => handleRemoveItem(key)}
                                        />
                                    </SpacedItems>
                                ))}
                                {workingSet.setData && <Button
                                    label="Add New Item"
                                    action={handleAddNewItem}
                                />}
                                {workingSet.id && (
                                    <Button
                                        label="Save Changes"
                                        type="submit"
                                    />
                                )}
                            </Form>
                        </SpacedItems>
                    </LoadingGate>
                </SpacedItems>
            </LoadingGate>
        </>
    );
}
 
export default MetadataEditor;