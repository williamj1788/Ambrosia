const fs = require("fs");
const Product = require("./Product");
const helper = require("../helper");
const AWS = require("aws-sdk");
const { awsID, awsKey, bucket } = require("../config");

const s3 = new AWS.S3({
  accessKeyId: awsID,
  secretAccessKey: awsKey
});

class ProductService {
  /**
   * creates a product from the given form and saves it to the database
   * @param {Object} productForm
   * @param {Object} picture picture to be saved.
   */
  async createProduct(productForm, picture) {
    if (!picture) {
      throw new Error("a picture must be included");
    }

    const pictureStream = fs.createReadStream(picture.path);
    const mimetype = picture.originalname.split(".")[1];
    const { Location } = await s3.upload({
      Bucket: bucket,
      Key: `${picture.filename}.${mimetype}`,
      Body: pictureStream
    }).promise();


    productForm.picture = Location;
    productForm.price = helper.trimNumber(productForm.price);

    const product = await Product.create(productForm);

    const productJson = product.toJSON();

    productJson.discountObj = [];

    return productJson;
  }
  /**
   * deletes the product that has a match id from the database.
   * will throw if no product is found.
   * @param {string} id 
   */
  async deleteProductById(id) {
    const product = await Product.findById(id);

    if (!product) {
      throw new Error("product not found");
    }
    const index = product.picture.lastIndexOf("/");
    const filename = product.picture.slice(index + 1);

    console.log(filename);

    await s3.deleteObject({
      Bucket: bucket,
      Key: filename
    }).promise();

    await product.remove();
  }
}

module.exports = ProductService;
