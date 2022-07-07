import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import NoVideo from '../novideo.png'


const ReleaseCard = ({ openReleaseEditModal, openDeleteModal, release, openReleaseViewModal }) => {

    const [togglePreview, setTogglePreview] = useState(false)

    const stopPropOpenModal = (e, type) => {
        e.stopPropagation();
        if (type === "delete") openDeleteModal(release);
        if (type === "edit") openReleaseEditModal(release);
    }

    return (
        <div onClick={() => openReleaseViewModal(release._id)} onMouseOver={() => setTogglePreview(true)} onMouseLeave={() => setTogglePreview(false)} className="release-card">
            {togglePreview === false && <img alt={release.title} src={release.preview.image} />}
            {togglePreview === true && (release.preview.video ? <video className="release-view-video" muted loop autoPlay>
                <source src={release.preview.video} type="video/mp4" />
            </video> : <img alt={release.title} src={NoVideo} />)   
            }
            <div className="release-status">
                { release.status?.discord == 0 ? <div className="discord-status"/> : null}
                { release.status?.discord == 1 ? <div className="discord-status early-released"/> : null}
                { release.status?.discord == 2 ? <div className="discord-status released"/> : null}
                { release.status?.twitter == 0 ? <div className="twitter-status"/> : null}
                { release.status?.twitter == 2 ? <div className="twitter-status early-released"/> : null}
                { release.status?.twitter == 1 ? <div className="twitter-status released"/> : null}
                <div className={release.status?.patreon > 0 ? "patreon-status released" : "patreon-status"} />
            </div>
            <div className="release-title">
                {release.title}
            </div>
            <div className="release-creator">{release.creator.name}</div>
            <div onClick={(e) => stopPropOpenModal(e, "delete")} className="delete-button"><FontAwesomeIcon icon={faTimes} /></div>
            <div onClick={(e) => stopPropOpenModal(e, "edit")} className="edit-button"><FontAwesomeIcon icon={faPencilAlt} /></div>
        </div>
    )
}

export default ReleaseCard
