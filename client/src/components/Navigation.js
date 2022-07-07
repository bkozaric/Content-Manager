
import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

function toggleClass() {
    document.querySelector(".toggle-nav").classList.toggle("open");
    document.querySelector(".navigation-container").classList.toggle("open");
}

const Navigation = ({ openReleaseModal, openCreatorModal }) => {
    return (
        <>
            <div onClick={() => toggleClass()} className="toggle-nav">
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </div>
            <div className="navigation-container">
                <div className="nav-item-header">Home</div>
                <div onClick={() => { window.location.href = "/" }} className="nav-item">Home</div>
                <div className="nav-item-header">Releases</div>
                <div onClick={() => { window.location.href = "/releases" }} className="nav-item">Manage</div>
                <div onClick={() => openReleaseModal()} className="nav-item">Add</div>
                <div className="nav-item-header">Creators</div>
                <div onClick={() => { window.location.href = "/creators" }} className="nav-item">Manage</div>
                <div onClick={() => openCreatorModal()} className="nav-item">Add</div>
            </div>
        </>
    )
}

export default Navigation
