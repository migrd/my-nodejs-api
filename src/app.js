const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://admin:${process.env.PASS}@cluster0-shard-00-00.txygi.mongodb.net:27017,cluster0-shard-00-01.txygi.mongodb.net:27017,cluster0-shard-00-02.txygi.mongodb.net:27017/db0?ssl=true&replicaSet=atlas-hflco6-shard-0&authSource=admin&retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

//carrega os models
const Product = require("./models/product");

const router = require("./routes/index");
const product = require("./routes/product");
const cors = require('cors');
const app = express();

app.use(
  bodyParser.json({
    limit: "5mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.use("/", router);
app.use("/products", product);

module.exports = app;
