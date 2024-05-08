const express = require("express");
const app = express();
const sessionPareser = require("express-session");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  sessionPareser({
    secret: "Sahar-Secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(authRoutes);

mongoose
  .connect(
    "mongodb+srv://AbdallahDereia:JLiq00ZXmUOuNl4v@cluster0.7ok67.mongodb.net/NodeJs_Course?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
    console.log("connected");
  })
  .catch((err) => {
    console.log("error: " + err);
  });
