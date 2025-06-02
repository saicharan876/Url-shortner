const express = require("express");
const URL =require('./url');

const {HandleGenerateShortUrl, HandleGetURLById}  = require("./url_controllers");


const route = express.Router();


route.post("/", HandleGenerateShortUrl);

route.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortid: shortId },
    {
      $push: {
        visithistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  return res.redirect(entry.redirecturl);
});

module.exports = route;
