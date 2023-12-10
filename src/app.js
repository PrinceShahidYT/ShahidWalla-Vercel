require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const BatchRoute = require("./Routes/Batch");
const SubjectRoute = require("./Routes/Subject");
const ChapterRoute = require("./Routes/Chapter");
const ContentRoute = require("./Routes/Content");

const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const middleWare = "/api";

app.get("/", (req, res) => {
  res.send({ message: "Api is running..." });
});

app.use(middleWare, BatchRoute);
app.use(middleWare, SubjectRoute);
app.use(middleWare, ChapterRoute);
app.use(middleWare, ContentRoute);

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server Connected on Port: ${PORT}`);
      });
    } catch (error) {
      console.log(`Can't connected to the server: ${error.message}`);
    }
}).catch((error) => {
    console.log("Mongoose Connection Error: " + error.message);
});
