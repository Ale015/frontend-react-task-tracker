import React from "react";
import "./TaskCard.css"
import {ReactComponent as DeleteIcon} from "../assets_icons/delete.svg"



const TaskCard = ({task, handleDragStart, deleteTask, openTaskDetails })=>{
    
    const cardStatusClass = task.status === "not_started" 
    ? "not_started"
    : task.status === "in_progress"
    ? "in_progress"
    : "completed";
    
    let statusFormatted = "";

    if(task.status === "not_started"){
        statusFormatted = "Not Started"
    } else if (task.status === "in_progress"){
        statusFormatted = "In Progress"
    } else {
        statusFormatted = "Completed"
    }
    
    
    return (
        <div
            className="task-card"
            onDragStart={(e)=> handleDragStart(e, task.id)}
            onClick={()=> openTaskDetails(task)}
            draggable
        >
            <p className="task-title">{task.title}</p>

            <div className="status-delete-line">
                <p className={`status-flag ${cardStatusClass}`}>{statusFormatted}</p>
                <button onClick={(e)=>{e.stopPropagation() ; deleteTask(task.id);}}><DeleteIcon className="delete-icon"/></button>
            </div>

        </div>
    )
}
export default TaskCard