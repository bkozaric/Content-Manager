const express = require("express");
const router = express.Router();
const releasesController = require("../controller/releases");


router
    .get("/", releasesController.getReleases)
    .get("/:id", releasesController.getRelease)
    .get("/discord/:id&:status", releasesController.updateDiscordStatus)
    .post("/tweet", releasesController.clipboardTweet)
    .post("/tweetEarly", releasesController.clipboardTweetEarly)
    .post("/patreon", releasesController.clipboardPatreon)
    .post("/add", releasesController.addRelease)
    .put("/edit", releasesController.editRelease)
    .delete("/:id", releasesController.deleteRelease)

module.exports = router;