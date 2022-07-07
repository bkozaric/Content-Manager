import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { getCreators } from '../functions/FetchFunctions'

const AddRelease = ({ isOpen, callClose, callParentUpdate }) => {


    const [creators, setCreators] = useState([])
    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        previewImg: "",
        previewVid: "",
        patreonUrl: "",
        animator: "",
        va: "",
        download: "",
        upscale: ""
    })
    const [downloadList, setDownloadList] = useState([])


    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formValues?.title || !formValues?.description || !formValues?.previewImg || !formValues?.patreonUrl || !formValues?.va || !formValues?.animator || downloadList.length === 0) {
            console.log("MISSING SOMETHING BRO")
        }
        else {
            try {
                const body = {
                    title: formValues.title,
                    description: formValues.description,
                    animator: creators.filter(c => c.name === formValues.animator)[0]._id,
                    va: creators.filter(c => c.name === formValues.va)[0]._id,
                    previewImg: formValues.previewImg,
                    previewVid: formValues.previewVid,
                    downloads: downloadList,
                    patreonUrl: formValues.patreonUrl,
                    upscaleAvailable: formValues.upscale
                };
                await fetch("/api/releases/add/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }).then(answer => answer.json())
                    .then(data => {
                        if (data?.success === 1) {
                            setFormValues({
                                title: "",
                                description: "",
                                previewImg: "",
                                previewVid: "",
                                patreonUrl: "",
                                animator: creators.filter(c => c.type === "animator")[0].name,
                                va: creators.filter(c => c.type === "va")[0].name,
                                download: "",
                                upscale: true
                            })
                            setDownloadList([]);
                            callClose();
                            callParentUpdate(data.releaseId)
                        }
                    });
            }
            catch (err) {
                console.error(err);
            }

        }
    }



    const getDomain = (url) => {
        if (url.includes("dropbox.com")) {
            return "Dropbox"
        }
        if (url.includes("mega.nz")) {
            return "Mega"
        }
        if (url.includes("drive.google.com")) {
            return "Google Drive"
        }
        if (url.includes("pomf.cat")) {
            return "Pomf.cat"
        }
        if (url.includes("catbox.moe")) {
            return "Catbox"
        }
        return "Unknown domain"
    }

    const addDownload = () => {
        if (formValues.download.trim().length) {
            setDownloadList([...downloadList, { domain: getDomain(formValues.download), url: formValues.download }]);
            setFormValues({ ...formValues, download: "" })
        }
    }

    const removeDownload = (e, d) => {
        e.stopPropagation();
        setDownloadList(prevVal => prevVal.filter(od => od !== d))
    }

    useEffect(async () => {
        (async () => {
            setCreators(await getCreators());
        })()
    }, [])


    useEffect(() => {
        if (creators?.length > 0) {
            let defaultAnimator = creators.filter(c => c.type === "animator")[0].name;
            let defaultVa = creators.filter(c => c.type === "va")[0].name;
            setFormValues({ ...formValues, animator: defaultAnimator, va: defaultVa })
        }
    }, [creators])


    if (!isOpen) return null
    if (creators?.length === 0) return null

    return ReactDom.createPortal(
        <>
            <div className="modal-overlay" onClick={() => callClose()} />
            <div className="modal-container">
                <form onSubmit={handleSubmit} className="form-container">
                    {formValues.previewImg && formValues.previewVid &&
                        <div className="form-row">
                            <img onClick={() => window.open(formValues.previewVid, "_blank")} src={formValues.previewImg} />
                        </div>}
                    <div className="form-row">
                        <label htmlFor="title">Title</label>
                        <input onChange={handleChange} value={formValues.title} name="title" className="text-input" type="text" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="description">Description</label>
                        <input onChange={handleChange} value={formValues.description} name="description" className="text-input" type="text" />
                    </div>
                    <div className="form-row">
                        <label htmlFor="patreonUrl">Patreon URL</label>
                        <input onChange={handleChange} value={formValues.patreonUrl} name="patreonUrl" className="text-input" type="text" />
                    </div>
                    <div className="form-row two-inputs">
                        <div className="form-column">
                            <label htmlFor="previewImg">Preview Image</label>
                            <input onChange={handleChange} value={formValues.previewImg} name="previewImg" className="text-input" type="text" />
                        </div>
                        <div className="form-column">
                            <label htmlFor="previewVid">Preview Video</label>
                            <input onChange={handleChange} value={formValues.previewVid} name="previewVid" className="text-input" type="text" />
                        </div>

                    </div>
                    <div className="form-row two-inputs">
                        <div className="form-column">
                            <label htmlFor="animator">Animator</label>
                            <select value={formValues.animator} onChange={handleChange} name="animator" className="dropdown-input">
                                {creators?.filter(c => c.type === "animator").map(c =>
                                    <option key={c._id}>{c.name}</option>
                                )}
                            </select></div>
                        <div className="form-column">
                            <label htmlFor="va">VA</label>
                            <select value={formValues.va} onChange={handleChange} name="va" className="dropdown-input">
                                {creators?.filter(c => c.type === "va").map(c =>
                                    <option key={c._id}>{c.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <label htmlFor="upscale">Upscale available</label>
                        <select value={formValues.upscale} onChange={handleChange} name="upscale" className="dropdown-input">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div className="form-row">
                        <label htmlFor="download">Download</label>
                        <input value={formValues.download} onChange={handleChange} name="download" className="text-input" type="text" />
                        <div onClick={() => addDownload()} className="add-download-button">
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <div className="download-list-container">
                            {downloadList.map((d, k) =>
                                <div key={k} onClick={() => window.open(d.url, "_blank")} className="download-item">
                                    {d.domain}
                                    <div className="remove-download">
                                        <FontAwesomeIcon onClick={(e) => removeDownload(e, d)} icon={faBan} />
                                    </div>
                                </div>)}
                        </div>
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

export default AddRelease
