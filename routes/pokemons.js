const express = require("express");
const { StatusCodes } = require("http-status-codes");
const router = express.Router();
const axios = require("axios");

const { getOrSetCache } = require("../db/connectRedis");

router.route("/").get(async (req, res) => {
  const response = await getOrSetCache(
    process.env.POKEMON_API_URI,
    async () => {
      return await axios.get(process.env.POKEMON_API_URI);
    }
  );

  // const response = await axios.get(process.env.POKEMON_API_URI)
  // console.log(response.data)
  res.status(StatusCodes.OK).json(response);
});

module.exports = router;
