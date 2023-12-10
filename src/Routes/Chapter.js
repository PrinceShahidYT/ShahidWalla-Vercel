const ChapterModel = require("../Models/ChapterModel");
const MyCache = require("../Cache/Cache");
const express = require("express");

const ChapterRoute = express.Router();

ChapterRoute.get("/batch/:batchSlug/:subjectSlug", MyCache, async (req, res) => {
  try {
    const _slug = req.params.subjectSlug;
    const GetChapter = await ChapterModel.find({ subject: _slug }).select(["-__v", "-subject"]);
    res.send({ success: true, Data: GetChapter });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

ChapterRoute.post("/batch/:batchSlug/:subjectSlug", async (req, res) => {
  try {
    const _slug = req.params.subjectSlug;
    const { name } = req.body;

    const createChapter = await ChapterModel.create({
      name: name,
      subject: _slug,
    });
    res.status(201).send({
      success: true,
      message: `Chapter Created: ${createChapter.name}`,
      slug: createChapter.slug,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

ChapterRoute.delete("/batch/:batchSlug/:subjectSlug/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const delChapter = await ChapterModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Chapter Deleted: ${delChapter.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = ChapterRoute;
