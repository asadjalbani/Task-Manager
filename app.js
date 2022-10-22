const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connecDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");

//middleware
app.use(express.static("./public"));
app.use(express.json());

// routes

app.use("/api/v1/tasks", tasks);
app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connecDB(process.env.MONGO_URI);
    app.listen(port, console.log("We are live on " + port));
  } catch (error) {
    console.log(error);
  }
};

start();
