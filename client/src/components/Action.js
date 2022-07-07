import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

const Action = ({ openReleaseModal, openCreatorModal }) => {
    return (
        <div className="action-container">
            <div className="action-header first">
                Manage
            </div>
            <div className="actions-row">
                <a href="/releases">
                    <div className="action-card first">
                        <FontAwesomeIcon icon={faFilm} />
                    </div>
                </a>
                <a href="/creators">
                    <div className="action-card second">
                        <FontAwesomeIcon icon={faUserFriends} />
                    </div>
                </a>
            </div>
            <div className="action-header second">
                Add New...
            </div>
            <div className="actions-row">

                <div onClick={() => openReleaseModal()} className="action-card third">
                    <FontAwesomeIcon icon={faFilm} />
                </div>

                <div onClick={() => openCreatorModal()} className="action-card fourth">
                    <FontAwesomeIcon icon={faUserPlus} />
                </div>

            </div>
        </div >
    )
}

export default Action
