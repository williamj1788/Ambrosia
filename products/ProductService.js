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

    const location = await uploadPicture(picture)

    productForm.picture = location;
    productForm.price = helper.trimNumber(productForm.price);

    const product = await Product.create(productForm);

    const productJson = product.toJSON();

    productJson.discountObj = [];

    return productJson;
  }
  /**
   * updates the product that matches the given id.
   * will throw if no product is found.
   * @param {Object} newProductForm 
   * @param {string} id id of the product to update
   */
  async updateProductById(newProductForm, id) {
    const oldProduct = await Product.findById(id);

    if (!oldProduct) {
      throw new Error("product not found");
    }

    if (newProductForm.type) {
      oldProduct.type = newProductForm.type;
    }
    if (newProductForm.name) {
      oldProduct.name = newProductForm.name;
    }
    if (newProductForm.description) {
      oldProduct.description = newProductForm.description;
    }
    if (newProductForm.price) {
      oldProduct.price = helper.trimNumber(newProductForm.price);
    }

    if (newProductForm.picture) {
      await deletePicture(oldProduct.picture);
      oldProduct.picture = await uploadPicture(newProductForm.picture);
    }

    const newProduct = await oldProduct.save();

    await newProduct.populate('discount').execPopulate();

    return newProduct.toJSON();
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

    await deletePicture(product.picture);

    await product.remove();
  }
}

module.exports = ProductService;

async function deletePicture(picture) {
  const index = picture.lastIndexOf("/");
  const filename = picture.slice(index + 1);
  await s3.deleteObject({
    Bucket: bucket,
    Key: filename
  }).promise();
}

async function uploadPicture(picture) {
  const pictureStream = fs.createReadStream(picture.path);
  const mimetype = picture.originalname.split(".")[1];
  const { Location } = await s3.upload({
    Bucket: bucket,
    Key: `${picture.filename}.${mimetype}`,
    Body: pictureStream
  }).promise();
  return Location;
}

