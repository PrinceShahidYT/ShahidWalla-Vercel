const SubjectModel = require("../Models/SubjectModel");
const express = require("express");
const MyCache = require("../Cache/Cache");

const SubjectRoute = express.Router();

SubjectRoute.get("/batch/:batchSlug", MyCache, async (req, res) => {
  try {
    const _slug = req.params.batchSlug;
    const GetSubjects = await SubjectModel.find({ batch: _slug }).select(["-__v", "-batch"]);
    res.send({ success: true, Data: GetSubjects });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

SubjectRoute.post("/batch/:batchSlug", async (req, res) => {
  try {
    const _slug = req.params.batchSlug;
    const { name, icon } = req.body;

    const createSubject = await SubjectModel.create({
      name: name,
      icon: icon,
      batch: _slug,
    });

    res.status(201).send({
      success: true,
      message: `Subject Created: ${createSubject.name}`,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

SubjectRoute.delete("/batch/:batchSlug/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const delSubject = await SubjectModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Subject Deleted: ${delSubject.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = SubjectRoute;
