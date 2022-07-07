const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const releaseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            required: true,
            maxlength: 256
        },
        creator: {
            type: ObjectId,
            ref: "creators",
            required: true,
        },
        va: {
            type: ObjectId,
            ref: "creators",
            required: true
        },
        patreonUrl: {
            type: String,
            required: true
        },
        preview: {
            image: {
                type: String,
                required: true
            },
            video: {
                type: String,
                default: ""
            }
        },
        status: {
            discord: {
                type: Number,
                default: 0
            },
            twitter: {
                type: Number,
                default: 0
            },
            patreon: {
                type: Number,
                default: 0
            }
        },
        upscaleAvailable: {
            type: Boolean,
            default: false
        },
        downloads: [
            {
                domain: String,
                url: String
            }
        ]
    },
    { timestamps: true }
);

const releaseModel = mongoose.model("releases", releaseSchema);
module.exports = releaseModel;