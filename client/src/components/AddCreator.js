import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const AddCreator = ({ isOpen, callClose, callParentUpdate }) => {

    const [formValues, setFormValues] = useState({
        type: "animator",
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
            console.log("Something is missing");
        }
        else {
            try {
                const body = {
                    name: formValues.name,
                    type: formValues.type.toLowerCase(),
                    tag: formValues.tag,
                    url: formValues.url
                };
                await fetch("/api/creators/add/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(answer => answer.json())
                    .then(data => {
                        if (data?.success === 1) {
                            setFormValues({
                                type: "animator",
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

    if (!isOpen) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={() => callClose()} />
            <div className="modal-container">
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-row">
                        <label htmlFor="type">Type</label>
                        <select value={formValues.type} onChange={handleChange} name="type" className="dropdown-input">
                            <option>Animator</option>
                            <option>VA</option>
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
                        <button className="submit-button" type="submit">Add</button>
                    </div>
                </form>
                <button className="close-modal-button" onClick={() => callClose()}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default AddCreator
