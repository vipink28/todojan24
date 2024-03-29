import { createContext, useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();


export const TaskProvider = ({ children }) => {
    const { setMessage, user } = useContext(AuthContext);
    const [allTasks, setAllTasks] = useState(null);
    const [recentTasks, setRecentTasks] = useState(null);
    const [latestTask, setLatestTask] = useState(null);

    //create task
    const createTask = async (formData) => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch('http://localhost:5000/tasks', config);
        if (response.status === 201) {
            setMessage('Task created successfully');
            getAllTasks(user.id);
        } else {
            setMessage('Something went wrong');
        }
    }

    const getAllTasks = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks?userId=${id}`, { method: "GET" });
        if (response.ok) {
            const tasks = await response.json();
            setAllTasks(tasks);
            const recent = tasks.slice(-3);
            setRecentTasks(recent);
            const latest = tasks[tasks.length - 1]
            setLatestTask(latest);
        } else {
            console.log("something went wrong");
        }
    }

    const updateTask = async (formData) => {
        const config = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }

        const response = await fetch(`http://localhost:5000/tasks/${formData.id}`, config);
        if (response.status === 200) {
            setMessage('Task Updated successfully');
            getAllTasks(user.id);
        } else {
            setMessage('Something went wrong');
        }
    }

    const deleteTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        if (response.status === 200) {
            setMessage('Task Deleted successfully');
            getAllTasks(user.id);
        } else {
            setMessage('Something went wrong');
        }
    }


    useEffect(() => {
        if (user) {
            getAllTasks(user.id)
        }
    }, [user])

    return (
        <TaskContext.Provider value={{
            createTask,
            allTasks,
            latestTask,
            recentTasks,
            updateTask,
            deleteTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContext;