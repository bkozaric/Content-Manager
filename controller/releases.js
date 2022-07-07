const releaseModel = require("../models/releases");

const clipboardy = require('clipboardy');

class Release {
    async getReleases(req, res) {
        try {
            let Release = await releaseModel
                .find()
                .populate("creator", "name")
                .populate("va", "name")
                .sort({ createdAt: -1 })
            if (Release) {
                return res.status(200).json(Release);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async getRelease(req, res) {
        try {
            let Release = await releaseModel
                .findById(req.params.id)
                .populate("creator", "name url tag")
                .populate("va", "name url tag")
            if (Release) {
                return res.status(200).json(Release);
            }
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async addRelease(req, res) {
        const { title, description, va, animator, previewImg, previewVid, downloads, patreonUrl, upscaleAvailable } = req.body;
        try {
            let newRelease = new releaseModel({
                title,
                description,
                va,
                creator: animator,
                "preview.image": previewImg,
                "preview.video": previewVid,
                patreonUrl,
                downloads,
                upscaleAvailable
            });
            let save = await newRelease.save();
            if (save) {
                return res.status(200).json({ success: 1, releaseId: save._id });
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ error: err });
        }
    }

    async editRelease(req, res) {
        const { id, title, description, va, animator, previewImg, previewVid, downloads, patreonUrl, upscaleAvailable } = req.body;

        const data = await releaseModel.findById(id);
        if (!data) {
            return res.status(404).json({
                success: 0, message: "Release does not exist",
            });
        } else {
            let releaseChange = releaseModel.findByIdAndUpdate(id, {
                title,
                description,
                "preview.image": previewImg,
                "preview.video": previewVid,
                patreonUrl,
                va,
                creator: animator,
                downloads,
                upscaleAvailable
            }, { useFindAndModify: false });
            releaseChange.exec((err, result) => {
                if (err) console.log(err);
                return res.status(200).json({ success: 1, message: "Release updated successfully!" });
            });
        }

    }

    async deleteRelease(req, res) {
        if (!req.params.id) {
            return res.status(400).json({ success: 0, error: "Missing release ID" });
        }
        try {
            let deleteRelease = await releaseModel.findByIdAndDelete(req.params.id);
            if (deleteRelease) {
                return res.status(200).json({ success: 1, message: "Release deleted" });
            }
        } catch (err) {
            return res.json({ message: err })
        }
    }

    async updateDiscordStatus(req, res) {
        try {
            await releaseModel.findByIdAndUpdate(req.params.id, { $set: { "status.discord": req.params.status } }, { useFindAndModify: false });

            res.status(200).json({ message: "Discord status updated succesfully" })
        }
        catch (err) {
            res.status(500).json({ message: err })
        }
    }

    async clipboardPatreon(req, res) {
        try {
            const { id, title, downloads, creator } = req.body;

            await releaseModel.findByIdAndUpdate(id, { $set: { "status.patreon": 1 } }, { useFindAndModify: false });

            clipboardy.writeSync(`${title}` +
                `Movie by: ${creator.name} ${creator.url}\n` +
                `Download here: \n${downloads.map((dl) => dl.domain).join("\n")}\n${downloads.map((dl) => dl.url).join("\n")}\n`
                )
                ;

            return res.sendStatus(200);
        }
        catch (err) {
            res.status(500).json({ message: err })
        }


    }

    async clipboardTweet(req, res) {
        try {
            const { id, title, downloads, va, creator, previewVid } = req.body;

            await releaseModel.findByIdAndUpdate(id, { $set: { "status.twitter": 1 } }, { useFindAndModify: false });

            clipboardy.writeSync(`${title}\n` +
                `\n` +
                `Movie by: ${creator}\n` +
                `Voice actor: ${va}\n` +
                `\n` +
                `Download links: \n${downloads.map(d => { return d.url }).join("\n")}`);

            return res.status(200).json({ message: "Text added to clipboard" });

        }
        catch (err) {
            return res.status(500).json({ message: err });
        }
    }

    async clipboardTweetEarly(req, res) {
        try {
            const { id, title, downloads, va, creator, previewVid } = req.body;

            await releaseModel.findByIdAndUpdate(id, { $set: { "status.twitter": 2 } }, { useFindAndModify: false });

            clipboardy.writeSync(`Early access movie!\n` +
                `\n` +
                `Movie by: ${creator}\n` +
                `Voice actor: ${va}\n` +
                `\n`);

            return res.status(200).json({ message: "Text added to clipboard" });

        }
        catch (err) {
            return res.status(500).json({ message: err });
        }
    }


}

const releasesController = new Release();
module.exports = releasesController;