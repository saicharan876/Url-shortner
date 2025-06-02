const express = require("express");
const shortId = require("shortid");
const URL = require("./url.js");

async function HandleGenerateShortUrl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortid = shortId.generate();

  try {
    const result = await URL.create({
      shortid,
      redirecturl: body.url,
      visithistory: [],
    });

    return res.status(201).json({ result });
  } catch (err) {
    console.error("Error creating URL:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = { HandleGenerateShortUrl ,HandleGetURLById};
