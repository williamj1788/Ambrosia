const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const Discount = require("./Discount");

const ProductScheme = new Scheme({
  type: {
    type: String,
    enum: ["pizza", "pasta", "bread", "dessert", "drink"],
    require: true
  },
  picture: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    maxlength: 200,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  discount: {
    type: mongoose.Types.ObjectId,
    ref: "discount"
  }
});

ProductScheme.statics.getAll = function (cb) {
  this.find({ discount: { $exists: true } }, (err, productsWithDiscounts) => {
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
  });

  return this.aggregate(
    [
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
    ],
    cb
  );
};

const model = mongoose.model("product", ProductScheme);

module.exports = model;
