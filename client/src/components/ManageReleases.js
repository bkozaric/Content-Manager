import React, { useState, useEffect } from 'react'
import ReleaseCard from './ReleaseCard'

const ManageReleases = ({ openReleaseEditModal, openDeleteModal, refreshTrigger, openReleaseViewModal }) => {

    const [releases, setReleases] = useState([])

    const getReleases = async () => {
        try {
            const response = await fetch("/api/releases/");
            const releasesJson = await response.json();
            setReleases(releasesJson);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getReleases();
    }, [])

    useEffect(() => {
        getReleases();
    }, [refreshTrigger])

    if(releases?.length === 0){
        <div className="releases-container">
            <div>No releases yet</div>
        </div>
    }

    return (
        <div className="releases-container">
            {releases.map(r => <ReleaseCard openDeleteModal={openDeleteModal} openReleaseViewModal={openReleaseViewModal} openReleaseEditModal={openReleaseEditModal} key={r._id} release={r} />)}
        </div>
    )
}

export default ManageReleases
