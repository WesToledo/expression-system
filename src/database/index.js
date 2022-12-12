require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    dbName: "expression-transportadora",
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("MongoDB CONECTADO com sucesso! at ", process.env.MONGO_URL);
    }
  }
);

module.exports = mongoose;
