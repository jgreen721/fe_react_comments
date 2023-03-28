import React from 'react'
import "./DeleteModal.css"
import { useAppContext } from '../../context/AppContext'

const DeleteModal = () => {
    const {showDeleteModal,confirmDelete,setShowDeleteModal} = useAppContext();
  return (
    <div className={showDeleteModal ? "delete-edit-overlay" : "delete-edit-overlay hide-overlay"}>
        <div className="delete-edit-card">
            <h3>Delete comment</h3>
            <h5 className="delete-modal-blurb">Are you sure you want to delete this comment? This will remove the comment and <span className="underline">can't</span> be undone!</h5>
            <div className="btn-row">
                <button onClick={()=>setShowDeleteModal(!showDeleteModal)} className="modal-btn cancel-btn">No, Cancel</button>
                <button onClick={confirmDelete} className="modal-btn delete-btn">Yes, Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal