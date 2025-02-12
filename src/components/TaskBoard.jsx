import React, {useState} from "react"
import TaskCard from "./TaskCard";
import "./TaskBoard.css";

const TaskBoard = ({tasks, addTask, deleteTask, updateTaskStatus, openTaskDetails}) => {

    const [newTask, setNewTask] = useState("");
    const [description, setDescription] = useState("");

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();

        const taskId = e.dataTransfer.getData("taskId");
        updateTaskStatus(taskId, newStatus)
    }

    const handleDragOver = (e)=>{
        e.preventDefault()
    };

    const handleAddTask = (e)=>{
        e.preventDefault();

        if(newTask.trim()) {
            addTask(newTask, description);
            setNewTask("");
            setDescription("");
        }
    }

    return (
        <div className="task-board">
            <form onSubmit={handleAddTask} className="task-form">
                <input type="text" value={newTask} onChange={(e)=> setNewTask(e.target.value)} placeholder="Nova Tarefa" />
                <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Descrição" />
                <button type="submit">Adicionar</button>
            </form>

            <div className="task-columns">
                {["not_started", "in_progress", "completed"].map((status)=> (

                    <div
                        key={status}
                        className="task-individual-column"
                        onDrop={(e) => handleDrop(e, status)}
                        onDragOver={handleDragOver}
                    >
                        <h2>
                            { status === "not_started" ? "Not Started" : status === "in_progress" ? "In Progress" : "Completed" }
                        </h2>

                        <div className="task-list">

                            {tasks.filter(task => task.status === status).map(task => (
                                <TaskCard key={task.id} task={task} handleDragStart={handleDragStart} deleteTask={deleteTask} openTaskDetails={openTaskDetails} />
                            ))}

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )

}

export default TaskBoard;