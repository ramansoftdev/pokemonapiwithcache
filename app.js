const express = require("express");
const morgan = require("morgan");
const redis = require("redis");
require("dotenv").config();
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const pokemonsRouter = require("./routes/pokemons");
const { connectRedis } = require("./db/connectRedis");

const app = express();
const port = process.env.PORT || 3000;

let redisClient = undefined;
let redisErrorTime = undefined;

app.get("/", (req, res) => {
  res.json({ msg: "homepage" });
});

app.use("/v1/api/pokemons", pokemonsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectRedis();
    app.listen(port, console.log(`express server listening on ${port}`));
  } catch (err) {
    console.log("error starting server " + err.message);
  }
};

start();
