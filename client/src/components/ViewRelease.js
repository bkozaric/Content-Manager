import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPatreon } from '@fortawesome/free-brands-svg-icons'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { discordRelease, twitterRelease, twitterReleaseEarly, patreonRelease } from "../functions/ReleaseFunctions"

const ViewRelease = ({ isOpen, callClose, callParentUpdate, releaseId }) => {

    const [release, setRelease] = useState(null)

    const getRelease = async () => {
        try {
            const response = await fetch("/api/releases/" + releaseId);
            const releaseJson = await response.json();
            setRelease(releaseJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    const clearAndClose = () => {
        callClose();
        setRelease(null);
    }

    const sendPopup = (message) => {
        callParentUpdate(message);
        getRelease();
    }

    useEffect(() => {
        if (releaseId) {
            getRelease();
        }
    }, [releaseId])

    if (!isOpen) return null
    if (!release) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={() => clearAndClose()} />
            <div className="modal-container">
                <div className="release-view-container">
                    <div className="image row">
                        <a href={release.preview.video} target="_blank"><img src={release.preview.image} /></a>
                    </div>
                    <div className="row title">
                        <a href={release.patreonUrl} target="_blank">{release.title}</a>
                    </div>
                    <div className="row header">
                        Description
                    </div>
                    <div className="row other indent">
                        {release.description}
                    </div>
                    <div className="row header">
                        Animation by
                    </div>
                    <div className="row other indent">
                        <a target="_blank" href={release.creator.url}>{release.creator.name}</a>
                    </div>
                    <div className="row header">
                        Voiced by
                    </div>
                    <div className="row other indent">
                        <a target="_blank" href={release.va.url}>{release.va.name}</a>
                    </div>
                    <div className="row header">
                        Release status
                    </div>
                    <div className="row other indent">
                        Discord:&nbsp;
                        {release.status.discord === 0 ? <span className="release-status-format">Not Released</span> : null}
                        {release.status.discord === 1 ? <span className="release-status-format">Early Release</span> : null}
                        {release.status.discord > 1 ? <span className="release-status-format">Public Release</span> : null}
                    </div>
                    <div className="row other indent">
                        Twitter:&nbsp;
                        {release.status.twitter === 0 ? <span className="release-status-format">Not Released</span> : null}
                        {release.status.twitter === 1 ? <span className="release-status-format">Public Release</span> : null}
                        {release.status.twitter > 1 ? <span className="release-status-format">Early Release</span> : null}
                        {/* Twitter: <span className="release-status-format">{release.status.twitter > 0 ? "Released" : "Not released"}</span> */}
                    </div>
                    <div className="row other indent">
                        Patreon: <span className="release-status-format">{release.status.patreon > 0 ? "Released" : "Not released"}</span>
                    </div>
                    <div className="row header">
                        Upscaled version available?
                    </div>
                    <div className="row other indent">
                        {release.upscaleAvailable ? "Yes" : "No"}
                    </div>
                    <div className="row header">
                        Downloads
                    </div>
                    {release.downloads.map(d =>
                        <div key={d._id} className="row other indent">
                            <a target="_blank" href={d.url}>{d.domain}</a>
                        </div>
                    )}
                    <div className="row actions">
                        <div onClick={() => discordRelease(release, 0, (msg) => sendPopup(msg))} className="release-button discord-early">
                            <FontAwesomeIcon icon={faDiscord} />&nbsp;&nbsp;Early
                        </div>
                        <div onClick={() => discordRelease(release, 1, (msg) => sendPopup(msg))} className="release-button discord-public">
                            <FontAwesomeIcon icon={faDiscord} />&nbsp;&nbsp;Public
                        </div>
                        <div onClick={() => twitterReleaseEarly(release, (msg) => sendPopup(msg))} className="release-button twitter-public">
                            <FontAwesomeIcon icon={faTwitter} />&nbsp;Early
                        </div>
                        <div onClick={() => twitterRelease(release, (msg) => sendPopup(msg))} className="release-button twitter-public">
                            <FontAwesomeIcon icon={faTwitter} />&nbsp;Public
                        </div>
                        <div onClick={() => patreonRelease(release, (msg) => sendPopup(msg))} className="release-button patreon-early">
                            <FontAwesomeIcon icon={faPatreon} />&nbsp;&nbsp;Patreon
                        </div>
                    </div>


                </div>
                <button className="close-modal-button" onClick={() => clearAndClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ViewRelease
