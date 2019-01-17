const express = require("express");
const router = express.Router();

// Get Home page
router.get("/", (req, res) => {
  res.render("index", { title: "EA Games Reviews" });
});

module.exports = router;
