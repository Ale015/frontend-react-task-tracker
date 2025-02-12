import React, { useState , useEffect} from "react";
import "./App.css"
import {API_URL} from "./config.js"
import TaskBoard from "./components/TaskBoard.jsx"
import TaskDetailsModal from "./components/TaskDetailsModal.jsx";


function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(
    ()=> {
      fetchTasks();
    },
    []
  );
  
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setTasks(data);
  
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const addTask = async (title, description) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method:"POST",
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({title, description, status: "not_started" })
      })

      if(!response.ok) {
        throw new Error("Erro ao adicionar a tarefa.")
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask])

    } catch (error) {
      console.error("Erro ao adicionar tarefa: ",error)
    }
  };
  

  const deleteTask = async (id) => {
    try {
      if(id){
        
        const response = await fetch(`${API_URL}/tasks/${id}` ,{
          method: "DELETE"
        })

        if(!response.ok){
          throw new Error("Erro ao deletar tarefa")
        }

        setTasks(tasks.filter(task => task.id !== id))
      }
      
    } catch (error) {
      console.log("Erro ao deletar a tarefa: ", error)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({status: newStatus})
      })

    if(!response.ok) throw new Error("Erro ao atualizar status")

      setTasks(tasks.map(task => {
        if (task.id === taskId){
          return {...task, status: newStatus}; 
        } else {
          return task;
        }
    }))
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa: ", error);
    }
  }


  return (
    <div className="App">
      <h1>
        Task Manager
      </h1>
      <TaskBoard
        tasks={tasks}
        addTask={addTask}
        deleteTask={deleteTask}
        updateTaskStatus={updateTaskStatus}
        openTaskDetails={setSelectedTask}
      />

    {selectedTask && <TaskDetailsModal task={selectedTask} onClose={()=> setSelectedTask(null)} />}

    </div>
  )     
}

export default App;
