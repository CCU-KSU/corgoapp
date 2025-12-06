import { use, useEffect, useState } from "react";
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

import Trash_Icon from "../../../assets/icon/trash.svg";

import ReactMarkdown from "react-markdown";

const DocsEdit = ({ setViewParams }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const paramsObject = Object.fromEntries(searchParams.entries());

    const [editorPrepStatus, setEditingPrepStatus] = useState(true);
    const [workingDoc, setWorkingDoc] = useState({
        id: "",
        name: "",
        content: ""
    });

    const [isSaved, setIsSaved] = useState(true);

    const [operationMessage, setOperationMessage] = useState({
        type: "",
        message: ""
    });

    useEffect(() => {
        setIsSaved(false);
    }, [workingDoc]);

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Documents Editor",
            backURL: "/manage/docs"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchDocument = async (id) => {
            setEditingPrepStatus(true);
            try {
                const response = await apiCall(`/docs/${id}`);
                setWorkingDoc(response.data);
            } catch (error) {
                console.error("Error fetching document:", error);
            } finally {
                setEditingPrepStatus(false);
            }
        };

        if (paramsObject.mode === "edit" && paramsObject.id) {
            fetchDocument(paramsObject.id);
        } else {
            loadBlank();
            setEditingPrepStatus(false);
        }
        
    }, []);

    const loadBlank = () => {
        console.log("Blank Loaded");
    };

    const createDocument = async () => {
        setEditingPrepStatus(true);
        try {
            const res = await apiCall("/docs/create", {
                method: "POST",
                body: {
                    docId: workingDoc.id,
                    docName: workingDoc.name,
                    docContent: workingDoc.content
                }
            });
            setOperationMessage({
                type: "success",
                message: "Document created successfully."
            });
            setIsSaved(true);
            navigate(`/manage/docs`);
        } catch (error) {
            console.error("Error creating document:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to create document."
            });
        } finally {
            setEditingPrepStatus(false);
        }
    }

    const updateDocument = async (id) => {
        setEditingPrepStatus(true);
        try {
            await apiCall(`/docs/${id}`, {
                method: "PUT",
                body: {
                    docName: workingDoc.name,
                    docContent: workingDoc.content
                }
            });
            setOperationMessage({
                type: "success",
                message: "Document updated successfully."
            });
            setIsSaved(true);
        } catch (error) {
            console.error("Error updating document:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to update document."
            });
        } finally {
            setEditingPrepStatus(false);
        }
    };

    const deleteDocument = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this document? This action cannot be undone.");
        if (!confirmDelete) return;
        setEditingPrepStatus(true);
        try {
            await apiCall(`/docs/${paramsObject.id}`, {
                method: "DELETE"
            });
            setOperationMessage({
                type: "success",
                message: "Document deleted successfully."
            });
            navigate("/manage/docs");
        } catch (error) {
            console.error("Error deleting document:", error);
            setOperationMessage({
                type: "error",
                message: "Failed to delete document."
            });
        } finally {
            setEditingPrepStatus(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (paramsObject.mode === "new") {
            await createDocument();
        } else if (paramsObject.mode === "edit") {
            await updateDocument(paramsObject.id);
        }
    };

    return (
        <>
            <LoadingGate isLoading={editorPrepStatus}>
                <SplitView>
                    <div className="left-pane">
                        <Form onSubmit={handleSubmit}>
                            <Input
                                id="docId"
                                label="Document ID"
                                value={workingDoc.id}
                                disabled={paramsObject.mode === "edit"}
                                onChange={(val) => setWorkingDoc(curr => ({ ...curr, id: val }))}
                                isRequired
                                placeholder="unique-document-id"
                            />
                            <Input
                                id="docName"
                                label="Document Name"
                                value={workingDoc.name}
                                onChange={(val) => setWorkingDoc(curr => ({ ...curr, name: val }))}
                                isRequired
                                placeholder="My Document Title"
                            />
                            <InputBox
                                id="docContent"
                                label="Document Content (Markdown Supported)"
                                value={workingDoc.content}
                                onChange={(val) => setWorkingDoc(curr => ({ ...curr, content: val }))}
                                isRequired
                                placeholder="Write your document content here..."
                            />
                            {operationMessage.message && (
                                <Message 
                                    type={operationMessage.type}
                                    message={operationMessage.message}
                                    isCentered
                                />
                            )}
                            <Button
                                label={paramsObject.mode === "new" ? "Create Document" : "Update Document"}
                                type="submit"
                            />
                            {paramsObject.mode === "edit" && <ButtonIcon
                                iconRef={Trash_Icon}
                                action={deleteDocument}
                                hasBorder
                            />}
                        </Form>
                    </div>
                    <div className="right-pane">
                        <ReactMarkdown>
                            {workingDoc.content}
                        </ReactMarkdown>
                    </div>
                </SplitView>
            </LoadingGate>
        </>
    );
}
 
export default DocsEdit;