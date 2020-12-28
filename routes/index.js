const express = require("express");
const router = express.Router();

router.use("/actors", require("./actor.route"));

module.exports = router;
