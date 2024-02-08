import React, { useContext, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskContext from '../context/TaskContext';

function CreateTask(props) {
    const { latestTask, recentTasks } = useContext(TaskContext);
    const [isUpdate, setIsUpdate] = useState(false);

    const handleEdit = () => {
        setIsUpdate(true);
    }
    return (
        <div className='container-fluid h-100'>
            <div className="row h-100">
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100 bg-primary text-white">
                    <TaskForm isUpdate={isUpdate} data={latestTask} />
                </div>
                <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center h-100">
                    <div className="card bg-primary mb-3 text-white">
                        <div className="card-body">
                            <div className='d-flex align-items-center'>
                                <h3>Latest Task</h3>
                                <button className='btn btn-info ms-auto' onClick={handleEdit}>Edit</button>
                            </div>
                            <div className='py-2'>
                                <h5>{latestTask?.title}</h5>
                                <p>{latestTask?.description}</p>
                                <div className='d-flex align-items-center'>
                                    <p>Modified: {latestTask?.modified}</p>
                                    <p className='ms-auto'>Due On: {latestTask?.duedate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;