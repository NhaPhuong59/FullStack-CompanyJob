const crypto = require("crypto");

const utilHelper = {};

utilHelper.sendResponse = (statusCode, data, message, res, next) => {
  const result = { data, message };
  return res.status(statusCode).send(result);
};

utilHelper.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex")
    .slice(0, len)
};

module.exports = utilHelper;