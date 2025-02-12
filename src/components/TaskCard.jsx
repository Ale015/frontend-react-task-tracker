import React from "react";
import "./TaskCard.css"

const TaskCard = ({task, handleDragStart, deleteTask, openTaskDetails })=>{
    return (
        <div
            className="task-card"
            draggable
            onDragStart={(e)=> handleDragStart(e, task.id)}
            onClick={()=> openTaskDetails(task)}
        >
            <p>{task.title}</p>
            <p>{task.status}</p>

            <button onClick={(e)=>{e.stopPropagation() ; deleteTask(task.id);}}>Excluir</button>

        </div>
    )
}
export default TaskCard