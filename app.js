const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

//Parsing
app.use(bodyParser.json());

//Routes
app.use("/person", require("./Routes/person"));

//Listening
app.listen(5000, (err) => (err ? console.log(err) : console.log("connection")));

//mongoose connection
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);
