const { bookPriceUnits } = require("../../config");
module.exports = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    image: {
      type: "string",
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(bookPriceUnits),
    },
    author: {
      type: "string"
    },
    isbnID: {
      type: "string"
    },
    userID: {
      type: "string"
    },
    _id: {
      type: "string"
    },
  },
  additionalProperties: false,
};
