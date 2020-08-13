const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/files", express.static(path.resolve(__dirname, "uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    //res.sendFile(path.resolve(__dirname,'..','..','client','build','index.html'));
  });
}

app.listen(process.env.PORT || 3333);
