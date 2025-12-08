import { useEffect, useState } from "react";
import { apiCall } from "../utils/api";

import Button_ from "../components/button/Button";
import CheckListItem from "../components/misc/CheckListItem";
import Form from "../components/form/Form";

import LoadingGate from "../components/effect/LoadingGate";
import SpacedItems from "../components/container/SpacedItems";
import BodySub from "../components/container/BodySub";

import Message from "../components/text/Message";

import Modal from "react-modal";
import ReactMarkdown from "react-markdown";

Modal.setAppElement('#root');

const Onboarding = ({ setViewParams }) => {
    const [checklistLoading, setChecklistLoading] = useState(true);
    const [checklist, setChecklist] = useState({});
    const [checkListProgress, setCheckListProgress] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalDetails, setModalDetails] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            showHeader: true,
            headerLabel: "Checklist",
            backURL: "",
            showNavBar: true
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchChecklist = async () => {
            setChecklistLoading(true);
            try {
                const res = await apiCall("/checklists/onboarding");
                setChecklist(res.data);
            } catch (error) {
                console.error("Error fetching checklist:", error);
                setError(true);
            } finally {
                await fetchCheckListProgress();
                setChecklistLoading(false);
            }
        };

        fetchChecklist();
    }, []);

    const fetchCheckListProgress = async () => {
        try {
            const resProgress = await apiCall("/users/checklist-progress/onboarding");
            setCheckListProgress(resProgress.data? resProgress.data.progress : {});
        } catch (error) {
            console.error("Error fetching checklist progress:", error);
            setError(true);
        }
    };

    const handleCheckItemToggle = async (e) => {
        try {
            await apiCall(`/users/mark-checklist-progress`,{
                method: "PATCH",
                body: {
                    checklistId: "onboarding",
                    itemPath: e.target.id,
                    status: e.target.checked
                }
            });
        } catch (error) {
            console.error("Error updating checklist item:", error);
            setError(true);
        } finally {
            await fetchCheckListProgress();
        }
    };

    const getProgressForItem = (fullId) => {
        const parts = fullId.split('.');
        if (parts.length === 1) {
            return checkListProgress?.[fullId]?.completed || false;
        } else {
            return checkListProgress?.[parts[0]]?.subItems?.[parts[1]]?.completed || false;
        }
    };

    const renderChecklistItems = (items, parentId = "") => {
        if (!items || Object.keys(items).length === 0) return null;

        return Object.entries(items)
            .sort(([, a], [, b]) => a.order - b.order)
            .map(([itemId, itemData]) => {
                const fullId = parentId ? `${parentId}.${itemId}` : itemId;
                const isCompleted = getProgressForItem(fullId);

                return (
                    <SpacedItems key={fullId}>
                        <CheckListItem 
                            checklistItemData={{ 
                                id: fullId, 
                                label: itemData.label, 
                                description: itemData.description
                            }}
                            status={isCompleted}
                            handleCheckItemToggle={handleCheckItemToggle}
                            onLabelClick={() => toggleDetailModal(itemData.description)}
                        />
                        {itemData.subItems && Object.keys(itemData.subItems).length > 0 && (
                            <SpacedItems style={{ paddingLeft: "1rem" }}>
                                {renderChecklistItems(itemData.subItems, fullId)}
                            </SpacedItems>
                        )}
                    </SpacedItems>
                );
            });
    };

    const toggleDetailModal = (details) => {
        setModalDetails(details);
        setModalIsOpen(true);
    };

    return (
        <>
            <LoadingGate isLoading={checklistLoading} isError={error}>
                <Form>
                    <Message
                        type="notice"
                        message="Click on an item label to see more details." 
                        isCentered
                    />
                    <SpacedItems>
                        {renderChecklistItems(checklist.items)}
                    </SpacedItems>
                </Form>
            </LoadingGate>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <BodySub>
                    <ReactMarkdown>
                        {modalDetails}
                    </ReactMarkdown>
                    <Button_
                        label="Close"
                        action={() => setModalIsOpen(false)}
                        isSmall
                    />
                </BodySub>
            </Modal>
        </>
    );
}
 
export default Onboarding;