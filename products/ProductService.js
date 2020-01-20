const Product = require("./Product");

const helper = require("../helper");

class ProductService {
  /**
   * gets all products from database. will throw if unable to retrieve products.
   */
  async getAllProducts() {
    Product.find(
      { discount: { $exists: true } },
      (err, productsWithDiscounts) => {
        if (err) throw err;
        for (let product of productsWithDiscounts) {
          Discount.findById(product.discount, (err, discount) => {
            if (err) throw err;
            if (!discount) {
              this.findByIdAndUpdate(
                product._id,
                { $unset: { discount: "" } },
                err => {
                  if (err) throw err;
                }
              );
            }
          });
        }
      }
    );

    return Product.aggregate([
      {
        $lookup: {
          from: "discounts",
          localField: "discount",
          foreignField: "_id",
          as: "discountObj"
        }
      },
      {
        $project: {
          discount: 0,
          __v: 0,
          "discountObj._id": 0,
          "discountObj.productID": 0,
          "discountObj.__v": 0
        }
      }
    ]).exec();
  }

  /**
   * creates a product from the given form and saves it to the database
   * @param {Object} productForm
   * @param {Object} picture picture to be saved. Will be convert to base64.
   */
  async createProduct(productForm, picture) {
    if (!picture) {
      throw new Error("a picture must be included");
    }

    productForm.picture = helper.toBase64(picture);
    productForm.price = helper.trimNumber(productForm.price);

    const product = await Product.create(productForm);

    const productJson = product.toJSON();

    productJson.discountObj = [];

    return productJson;
  }
}

module.exports = ProductService;
