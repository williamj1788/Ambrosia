require("dotenv").config();

const env = process.env.NODE_ENV;

module.exports = {
  url:
    env === "production"
      ? process.env.PRODUCTION_DATABASE
      : process.env.DEV_DATABASE,
  clientID: process.env.CLIENT_ID,
  secretKey: process.env.KEY,
  bucket: env === "production"
    ? process.env.S3_PRODUCTION_BUCKET
    : process.env.S3_DEV_BUCKET,
  awsID: process.env.AWS_ID,
  awsKey: process.env.AWS_KEY
};
