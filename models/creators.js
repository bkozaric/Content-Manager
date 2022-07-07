const mongoose = require("mongoose");

const creatorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
        },
        url: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: "",
        },
        type: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const creatorModel = mongoose.model("creators", creatorSchema);
module.exports = creatorModel;