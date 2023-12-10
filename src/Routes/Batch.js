const express = require("express");
const BatchModel = require("../Models/BatchModel");
const MyCache = require("../Cache/Cache");

const BatchRoute = express.Router();

BatchRoute.get("/batch", MyCache, async (req, res) => {
  try {
    const GetBatch = await BatchModel.find({}).select("-__v");
    res.send({ success: true, Data: GetBatch });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

BatchRoute.post("/batch", async (req, res) => {
  try {
    const AddBatch = new BatchModel(req.body);
    const createdBatch = await AddBatch.save();
    res.status(201).send({ success: true, message: `Batch Created: ${createdBatch.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

BatchRoute.delete("/batch/:batchId", async (req, res) => {
  try {
    const _id = req.params.batchId;
    const delBatch = await BatchModel.findByIdAndDelete(_id);
    res.send({ success: true, message: `Batch Deleted: ${delBatch.name}` });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = BatchRoute;
