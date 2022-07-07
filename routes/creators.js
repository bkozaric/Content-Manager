const express = require("express");
const router = express.Router();
const creatorsController = require("../controller/creators");


router
    .get("/", creatorsController.getCreators)
    .post("/add", creatorsController.addCreator)
    .put("/edit", creatorsController.editCreator)

module.exports = router;