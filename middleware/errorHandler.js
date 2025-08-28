const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (err.statusCode !== undefined) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "something unexpected happened, try again!!!" , err : err.message});
};

module.exports = errorHandler;