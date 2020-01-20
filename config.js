require("dotenv").config();

const env = process.env.NODE_ENV;

module.exports = {
  url:
    env === "production"
      ? process.env.PRODUCTION_DATABASE
      : process.env.DEV_DATABASE,
  clientID: process.env.CLIENT_ID,
  secretKey: process.env.KEY
};
