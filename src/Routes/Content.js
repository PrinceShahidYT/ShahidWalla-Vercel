const ContentModel = require("../Models/ContentModel");
const express = require("express");
const MyCache = require("../Cache/Cache");

const ContentRoute = express.Router();

ContentRoute.get("/batch/:batchSlug/:subjectSlug/contents", MyCache, async (req, res) => {
  try {
    const _slug = req.params.subjectSlug;
    const GetContent = await ContentModel.find({ subject: _slug })
      .find(req.query)
      .select(["-__v", "-subject", "-contentType"]);
    res.send({ success: true, Data: GetContent });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

ContentRoute.post("/batch/:batchSlug/:subjectSlug/:chapterSlug", async (req, res) => {
  try {
    const _slug = req.params.chapterSlug;
    const _subSlug = req.params.subjectSlug;
    const dataArray = req.body;

    const createContent = await ContentModel.insertMany(
      dataArray.map(({ name, image, contentType, contentUrl }) => ({
        name,
        image,
        contentType,
        contentUrl,
        tag: _slug,
        subject: _subSlug,
      }))
    );

    res.status(201).send({
      success: true,
      message: `Contents Created: ${createContent.length} items`,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

ContentRoute.delete("/batch/:batchSlug/:subjectSlug/:contents/:ids", async (req, res) => {
  try {
    const ids = req.params.ids.split(",");
    const delContent = await ContentModel.deleteMany({ _id: { $in: ids } });
    res.send({
      success: true,
      message: `Contents Deleted: ${delContent.deletedCount} items`,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = ContentRoute;
