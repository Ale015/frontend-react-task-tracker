import React from "react";
import "./TaskDetailsModal.css";
import {ReactComponent as EditIcon} from "../assets_icons/edit.svg"


const TaskDetailsModal = ({task, onClose}) => {
  if(!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e)=> e.stopPropagation()}>
        <div className="navModalBar">
          <button className="btn-edit"><EditIcon className="icon_edit"/></button>
          <button className="btn-close" onClick={(e) => {e.stopPropagation(); onClose();}}>X</button>
        </div>
        <div className="modal-content">
          <h2>
            {task.title}
          </h2>

          <p className="p_task_status">{task.status}</p>

          {task.description && (
            <div className="descriptionModalDiv">
              <p className="p_description">Descrição</p>
              <p className="p_text">{task.description}</p>
            </div>
          )}
          {task.created_at && 
          <p className="p_date">
            <strong>Criado em: </strong> 
            {new Date(task.created_at).toLocaleDateString()}
          </p>}
        </div>
        </div>
      
    </div>
  )
}

export default TaskDetailsModal;
