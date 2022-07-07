import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const EditCreator = ({ isOpen, callClose, callParentUpdate, creator }) => {

    const [formValues, setFormValues] = useState({
        name: "",
        tag: "",
        url: ""
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValues?.name || !formValues?.tag || !formValues?.url) {
            console.log("Missing field");
        }
        else {
            try {
                const body = {
                    id: creator._id,
                    name: formValues.name,
                    tag: formValues.tag,
                    url: formValues.url
                };
                await fetch("/api/creators/edit/", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(answer => answer.json())
                    .then(data => {
                        if (data?.success === 1) {
                            setFormValues({
                                name: "",
                                tag: "",
                                url: ""
                            });
                            callClose();
                            callParentUpdate()
                        }
                    });
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        if (creator) {
            setFormValues({
                name: creator.name,
                tag: creator.tag,
                url: creator.url
            })
        }
    }, [creator])

    if (!isOpen) return null
    if (!creator) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={() => callClose()} />
            <div className="modal-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-row">
                        <label htmlFor="type">Type</label>
                        <select disabled name="type" className="dropdown-input">
                            <option>{creator.type === "va" ? "VA" : "Animator"}</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="name">Name</label>
                        <input onChange={handleChange} value={formValues.name} name="name" className="text-input" type="text" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="tag">Tag</label>
                        <input onChange={handleChange} value={formValues.tag} name="tag" className="text-input" type="text" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="url">URL</label>
                        <input onChange={handleChange} value={formValues.url} name="url" className="text-input" type="text" />
                    </div>

                    <div className="form-row inc-tmg">
                        <button className="submit-button" type="submit">Save</button>
                    </div>
                </form>
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default EditCreator
