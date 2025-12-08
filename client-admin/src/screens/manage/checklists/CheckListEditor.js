import { useState, useEffect } from "react";
import { apiCall } from "../../../utils/api";

import Trash_Icon from "../../../assets/icon/trash.svg";

import Button from "../../../components/button/Button";
import ButtonIcon from "../../../components/button/ButtonIcon";
import Input from "../../../components/input/Input";
import InputBox from "../../../components/input/InputBox";
import InputDropdown from "../../../components/input/InputDropdown";
import InputDropdownNew from "../../../components/input/InputDropdownNew";

import Form from "../../../components/form/Form";
import SpacedItems from "../../../components/container/SpacedItems";
import LoadingGate from "../../../components/effect/LoadingGate";

import Message from "../../../components/text/Message";

const CheckListEditor = ({ setViewParams }) => {

    const [loadingChecklistsList, setLoadingChecklistsList] = useState(true);
    const [checklistsList, setChecklistsList] = useState([]);
    const [workingChecklist, setWorkingChecklist] = useState(null);
    const [loadingChecklist, setLoadingChecklist] = useState(false);

    const [operationMessage, setOperationMessage] = useState({
        type: "",
        message: ""
    });

    useEffect(() => {
        setViewParams(curr => ({
            ...curr,
            headerLabel: "Checklist Editor",
            backURL: "/manage"
        }));
    }, [setViewParams]);

    useEffect(() => {
        const fetchChecklistsList = async () => {
            setLoadingChecklistsList(true);
            try {
                const response = await apiCall("/checklists");
                setChecklistsList(response.data);
            } catch (error) {
                console.error("Error fetching checklists list:", error);
            } finally {
                setLoadingChecklistsList(false);
            }
        };

        fetchChecklistsList();
    }, []);

    // When a checklist is selected, fetch its details
    const onWorkingChecklistChange = async (id) => {
        console.log("Selected checklist ID:", id);
        setWorkingChecklist({ id });
        setLoadingChecklist(true);
        try {
            const response = await apiCall(`/checklists/${id}`);
            setWorkingChecklist({
                id,
                name: response.data.name,
                items: response.data.items || {}
            });
        } catch (error) {
            console.error("Error fetching checklist details:", error);
        } finally {
            setLoadingChecklist(false);
        }
    };

    // generate unique id
    const genId = () => Math.random().toString(36).substring(2, 7) + Date.now().toString(36);

    // Update an item by id
    const updateItemById = (itemsObj, id, updater) => {
        let didChange = false;
        const clone = (obj) => {
            const result = {};
            for (const k in obj) result[k] = obj[k];
            return result;
        };

        const recurse = (node) => {
            const newNode = clone(node);
            for (const key of Object.keys(node)) {
                if (key === id) {
                    newNode[key] = updater(node[key]);
                    didChange = true;
                } else if (node[key].subItems) {
                    const updatedSub = recurse(node[key].subItems);
                    if (updatedSub !== node[key].subItems) {
                        newNode[key] = { ...node[key], subItems: updatedSub };
                        didChange = true;
                    }
                }
            }
            return newNode;
        };

        const res = recurse(itemsObj || {});
        return didChange ? res : itemsObj;
    };

    // Remove item by id
    const removeItemById = (itemsObj, id) => {
        const clone = (obj) => {
            const result = {};
            for (const k in obj) result[k] = obj[k];
            return result;
        };

        let didRemove = false;

        const recurse = (node) => {
            const newNode = clone(node);
            for (const key of Object.keys(node)) {
                if (key === id) {
                    delete newNode[key];
                    didRemove = true;
                } else if (node[key].subItems) {
                    const updatedSub = recurse(node[key].subItems);
                    if (updatedSub !== node[key].subItems) {
                        newNode[key] = { ...node[key], subItems: updatedSub };
                        didRemove = true;
                    }
                }
            }
            return newNode;
        };

        const res = recurse(itemsObj || {});
        return didRemove ? res : itemsObj;
    };

    // Add a new item to given container.
    const addItem = (parentId = null) => {
        const newId = genId();
        if (!parentId) {
            // add to top-level
            setWorkingChecklist(prev => ({
                ...prev,
                items: {
                    ...prev.items,
                    [newId]: { label: "", description: "", order: Object.keys(prev.items || {}).length + 1, subItems: {} }
                }
            }));
            return;
        }

        // add to parent -> subItems
        setWorkingChecklist(prev => {
            const updated = updateItemById(prev.items || {}, parentId, (item) => {
                const sub = item.subItems ? { ...item.subItems } : {};
                sub[newId] = { label: "", description: "", order: Object.keys(sub).length + 1, subItems: {} };
                return { ...item, subItems: sub };
            });
            return { ...prev, items: updated };
        });
    };

    // Move item up/down within its immediate container
    const moveItem = (itemId, direction) => {
        // direction: 'up' or 'down'
        setWorkingChecklist(prev => {
            const operate = (container) => {
                const keys = Object.keys(container || {});
                if (!keys.length) return container;
                // build array sorted by order
                const arr = keys.map(k => ({ id: k, order: container[k].order || 0 }));
                arr.sort((a, b) => a.order - b.order);
                const idx = arr.findIndex(a => a.id === itemId);
                if (idx === -1) return container;
                const swapWith = direction === 'up' ? idx - 1 : idx + 1;
                if (swapWith < 0 || swapWith >= arr.length) return container;
                const newContainer = { ...container };
                const aId = arr[idx].id;
                const bId = arr[swapWith].id;
                const aOrder = newContainer[aId].order || 0;
                const bOrder = newContainer[bId].order || 0;
                newContainer[aId] = { ...newContainer[aId], order: bOrder };
                newContainer[bId] = { ...newContainer[bId], order: aOrder };
                return newContainer;
            };

            // try top-level first, if not found recursively attempt in subItems
            const tryRecurse = (node) => {
                // if itemId exists at this level
                if (node && node[itemId]) {
                    return operate(node);
                }
                // else recurse
                const clone = { ...node };
                let changed = false;
                for (const k of Object.keys(node || {})) {
                    if (node[k].subItems) {
                        const newSub = tryRecurse(node[k].subItems);
                        if (newSub !== node[k].subItems) {
                            clone[k] = { ...node[k], subItems: newSub };
                            changed = true;
                        }
                    }
                }
                return changed ? clone : node;
            };

            const newItems = tryRecurse(prev.items || {});
            return { ...prev, items: newItems };
        });
    };

    // Handlers for editing label/description
    const handleLabelChange = (id, val) => {
        setWorkingChecklist(prev => ({ ...prev, items: updateItemById(prev.items || {}, id, (it) => ({ ...it, label: val })) }));
    };
    const handleDescriptionChange = (id, val) => {
        setWorkingChecklist(prev => ({ ...prev, items: updateItemById(prev.items || {}, id, (it) => ({ ...it, description: val })) }));
    };

    const handleRemoveItem = (id) => {
        setWorkingChecklist(prev => ({ ...prev, items: removeItemById(prev.items || {}, id) }));
    };

    // Save checklist to server
    const handleSaveChecklist = async (event) => {
        event.preventDefault();
        if (!workingChecklist || !workingChecklist.id) return;
        try {
            await apiCall(`/checklists/${workingChecklist.id}`, {
                method: 'PUT',
                body: {
                    items: workingChecklist.items
                }
            });
            // alert('Checklist saved successfully.');
            setOperationMessage({
                type: "success",
                message: "Checklist saved successfully."
            });
        } catch (err) {
            alert('Failed to save checklist: ' + err.message);
        }
    };

    // Recursive renderer for items
    const renderItems = (items) => {
        if (!items) return null;
        // convert to array sorted by order
        const arr = Object.keys(items).map(k => ({ id: k, ...items[k] }));
        arr.sort((a, b) => (a.order || 0) - (b.order || 0));
        return arr.map(item => (
            <div key={item.id} style={{ borderLeft: '1px solid #ddd', paddingLeft: '0.75rem', marginBottom: '0.5rem' }}>
                <SpacedItems direction="row" gap={"0.5rem"}>
                    <Input id={`item-label-${item.id}`} value={item.label || ''} onChange={(v) => handleLabelChange(item.id, v)} isRequired />
                    <Button label="Add SubItem" isSmall action={() => addItem(item.id)} />
                    <Button label="Remove" isSmall action={() => handleRemoveItem(item.id)} />
                    <Button label="Up" isSmall action={() => moveItem(item.id, 'up')} />
                    <Button label="Down" isSmall action={() => moveItem(item.id, 'down')} />
                </SpacedItems>
                <div style={{ marginTop: '0.25rem' }}>
                    <InputBox id={`item-desc-${item.id}`} value={item.description || ''} onChange={(v) => handleDescriptionChange(item.id, v)} isRequired />
                </div>
                {/* render children */}
                {item.subItems && Object.keys(item.subItems).length > 0 && (
                    <div style={{ marginTop: '0.5rem', marginLeft: '1rem' }}>
                        {renderItems(item.subItems)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <>
            <LoadingGate isLoading={loadingChecklistsList}>
                <SpacedItems>
                    <InputDropdownNew
                        id="checklist-selector"
                        label="Select Checklist to Edit"
                        options={checklistsList}
                        value={workingChecklist ? (workingChecklist.id || '') : ''}
                        onChange={onWorkingChecklistChange}
                        optionKey="id"
                        optionValue="id"
                        optionLabel="name"
                        placeholder="Select a Checklist"
                    />
                    {operationMessage && (operationMessage.message) && <Message type={operationMessage.type} message={operationMessage.message} />}
                    {workingChecklist && <Message type="info" message="Modify the checklist items as needed. When you are done, click 'Save Changes' to update the checklist." />}
                    <LoadingGate isLoading={loadingChecklist}>
                        <Form onSubmit={handleSaveChecklist}>
                            <SpacedItems direction="column">
                                {workingChecklist && (
                                    <>
                                        <div>
                                            {renderItems(workingChecklist.items)}
                                        </div>
                                        <SpacedItems direction="row">
                                            <Button label="Add Top-level Item" action={() => addItem(null)} />
                                            <Button label="Save Checklist" type="submit" />
                                        </SpacedItems>
                                    </>
                                )}
                            </SpacedItems>
                        </Form>
                    </LoadingGate>
                </SpacedItems>
            </LoadingGate>

        </>
    );
}
 
export default CheckListEditor;