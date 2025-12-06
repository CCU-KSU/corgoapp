import { Link } from "react-router-dom"

import Icon_ChevronRight from "../../assets/icon/chevron-right.svg";

const CheckListItem = ({ checklistItemData, status, handleCheckItemToggle, onLabelClick }) => {
    return (
        <>
            <div className="check-list-item" style={{
                display: "flex",
                flexDirection: "row",
                outline: "solid 2px black",
                borderRadius: "0.75rem",
                width: "100%",
                maxWidth: "18rem",
                padding: "0.5rem",
                boxSizing: "border-box",
                gap: "0.5rem",
                alignItems: "center"
            }}>
                <input 
                    type="checkbox" 
                    id={checklistItemData.id}
                    onChange={handleCheckItemToggle}
                    name={checklistItemData.id}
                    checked={status} 
                    style={{
                        margin: "0",
                        width: "1.5rem",
                        height: "1.5rem",
                        borderRadius: "0.25rem"
                    }}
                />
                {/* <label htmlFor={taskData.id}>{taskData.title}</label> */}
                <div
                    style={{
                        textDecoration: "none",
                        color: "inherit",
                        flex: "1",
                        fontSize: "large",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: onLabelClick ? "pointer" : undefined
                    }}
                    onClick={onLabelClick}
                >
                    <p className="no-spacing" style={{flex: "1"}}>
                        {checklistItemData.label}
                    </p>
                    <img 
                        src={Icon_ChevronRight} 
                        alt=">"
                        style={{
                            width: "1rem",
                            height: "1rem"
                        }}
                    />
                </div>
                
            </div>
        </>
    );
}
 
export default CheckListItem;