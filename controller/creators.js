const creatorModel = require("../models/creators");

class Creator {

    async getCreators(req, res) {


        try {
            let Creator = await creatorModel
                .find()
                .sort({ _id: 1 });
            if (Creator) {
                return res.status(200).json(Creator);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async getCreator(req, res) {
        try {
            let Creator = await creatorModel
                .findById(req.params.id)
                .sort({ _id: 1 });
            if (Creator) {
                return res.status(200).json(Creator);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async addCreator(req, res) {
        const { type, name, url, tag } = req.body;
        try {
            let newCreator = new creatorModel({
                type,
                name,
                tag,
                url
            });
            let save = await newCreator.save();
            if (save) {
                return res.status(200).json({ success: 1, creatorId: save._id });
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ error: err });
        }
    }

    async editCreator(req, res) {
        const { id, name, tag, url } = req.body;

        const data = await creatorModel.findById(id);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "Creator does not exist",
            });
        } else {
            let creatorChange = creatorModel.findByIdAndUpdate(id, {
                name,
                tag,
                url
            }, { useFindAndModify: false });
            creatorChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "Creator updated successfully!" });
            });
        }

    }
}

const creatorsController = new Creator();
module.exports = creatorsController;