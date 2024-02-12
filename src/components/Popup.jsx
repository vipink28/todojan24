import React from 'react';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';

function Popup(props) {
    const { type, data } = props;

    return (
        <div className="modal" tabindex="-1" id='task-modal'>
            <div className="modal-dialog">
                {
                    type ?
                        <div className="modal-content bg-primary text-white">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                <TaskForm data={data} isUpdate={true} isPopup={true} />
                                            </div>
                                            : <div> Delete</div>
                                }
                            </div>
                        </div> : ""
                }
            </div>
        </div>
    );
}

export default Popup;