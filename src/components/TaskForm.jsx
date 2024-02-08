import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {
    const { isUpdate, data } = props;

    const { createTask } = useContext(TaskContext);
    const { message, setMessage, user } = useContext(AuthContext);
    const [formData, setFormData] = useState(null);




    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((prev) => (
            {
                ...prev,
                [name]: value,
                userId: user?.id,
                modified: Date(),
                role: 'user'
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(formData);
    }

    useEffect(() => {
        if (isUpdate) {
            setFormData(data);
        }
    }, [isUpdate])

    useEffect(() => {
        setMessage("");
    }, [])

    return (
        <div className='w-50'>
            <h3 className='text-white'>{isUpdate ? 'Update Task' : 'Create Task'}</h3>
            <div className='card'>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className='form-label'>Title</label>
                            <input type="text" name='title' className='form-control' value={formData?.title} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Description</label>
                            <textarea name="description" className='form-control' value={formData?.description} onChange={handleChange}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className='form-label'>Due Date</label>
                            <input type="datetime-local" name='duedate' className='form-control' value={formData?.duedate} onChange={handleChange} />
                        </div>
                        {message}
                        {
                            isUpdate ?
                                <>
                                    <button className='btn btn-primary' onClick={handleSubmit}>Update Task</button>
                                    <button className='btn btn-warning ms-2' onClick={handleSubmit}>Cancel</button>
                                </>
                                :
                                <button className='btn btn-primary' onClick={handleSubmit}>Create Task</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;