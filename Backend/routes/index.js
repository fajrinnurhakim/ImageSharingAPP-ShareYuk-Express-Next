const express = require("express");
const router = express.Router();
const AuthRouter = require("./auth.js");

router.use("/auth", AuthRouter);

module.exports = router;
