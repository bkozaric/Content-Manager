import React, { useEffect, useState } from 'react'

import { getCreators } from "../functions/FetchFunctions"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const ManageCreators = ({ openCreatorEditModal, refreshTrigger }) => {

    const [creators, setCreators] = useState([])

    useEffect(() => {
        (async () => {
            setCreators(await getCreators());
        })()
    }, [])

    useEffect(() => {
        (async () => {
            setCreators(await getCreators());
        })()
    }, [refreshTrigger])

    if (creators?.length === 0) return null;

    return (
        <div className="creators-container">
            <table>
                <thead>
                    <tr className="main-row">
                        <th>Name</th>
                        <th>Tag</th>
                        <th>Actions</th>
                    </tr>

                </thead>
                <tbody>
                    <tr className="header-row">
                        <th colSpan="3">VAs</th>
                    </tr>
                    {creators?.filter(c => c.type === "va").map((c, k) => <tr key={k}>
                        <td><a target="_blank" className="creator-name-link" href={c.url}>{c.name}</a></td>
                        <td>{c.tag || "/"}</td>
                        <td className="actions-cell">
                            {/*<FontAwesomeIcon icon={faTrashAlt} />*/}
                            <FontAwesomeIcon onClick={() => openCreatorEditModal(c)} icon={faPencilAlt} /></td>
                    </tr>)}
                    <tr className="splitter-row"><th colSpan="3"></th></tr>
                    <tr className="header-row">
                        <th colSpan="3">Animators</th>
                    </tr>
                    {creators?.filter(c => c.type === "animator").map((c, k) => <tr key={k}>
                        <td><a target="_blank" className="creator-name-link" href={c.url}>{c.name}</a></td>
                        <td>{c.tag || "/"}</td>
                        <td className="actions-cell">
                            {/*<FontAwesomeIcon icon={faTrashAlt} />*/}
                            <FontAwesomeIcon onClick={() => openCreatorEditModal(c)} icon={faPencilAlt} /></td>
                    </tr>)}
                </tbody>
            </table>

        </div>
    )
}

export default ManageCreators
