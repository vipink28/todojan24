import React, { useContext, useRef } from 'react';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';
import TaskContext from '../context/TaskContext';

function Popup(props) {
    const { type, data } = props;
    const closeBtn = useRef(null);
    const { deleteTask } = useContext(TaskContext);


    return (
        <div className="modal" tabIndex="-1" id='task-modal'>
            <div className="modal-dialog">
                {
                    type ?
                        <div className="modal-content bg-primary text-white">
                            <div className="modal-header">
                                <button ref={closeBtn} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {
                                    type === "view" ?
                                        <div className='py-2'>
                                            <h5>{data?.title}</h5>
                                            <p>{data?.description}</p>
                                            <div className='d-flex align-items-center'>
                                                <p>Modified: {formatDate(data?.modified)}</p>
                                                <p className='ms-auto'>Due On: {formatDate(data?.duedate)}</p>
                                            </div>
                                        </div>
                                        : type === "edit" ?
                                            <div>
                                                <TaskForm closeBtn={closeBtn} data={data} isUpdate={true} isPopup={true} />
                                            </div>
                                            : <div>
                                                <p>Are you sure? you want to delete this task.</p>
                                                <div className='d-flex align-items-center'>
                                                    <button data-bs-dismiss="modal" onClick={() => { deleteTask(data?.id) }} className='btn btn-danger ms-auto'>Yes</button>
                                                    <button data-bs-dismiss="modal" className='btn btn-warning ms-2'>No</button>
                                                </div>
                                            </div>
                                }
                            </div>
                        </div> : ""
                }
            </div>
        </div>
    );
}

export default Popup;