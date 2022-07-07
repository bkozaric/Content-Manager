import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const DeleteModal = ({ isOpen, callClose, callParentUpdate, release }) => {

    const confirmDelete = async () => {
        await fetch("/api/releases/" + release._id, { method: "DELETE" })
            .then(answer => {
                if (answer.status === 200) {
                    callParentUpdate();
                }
            })
            .catch(err => console.log(err));
    }

    if (!isOpen) return null
    if (!release) return null


    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={() => callClose()} />
            <div className="modal-container">
                <div className="delete-confirm">
                    <p>Are you sure you want to delete the following release?</p>
                    <p>{release.title}</p>
                    <div onClick={() => confirmDelete()} className="delete-button">Confirm</div>
                </div>
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default DeleteModal
