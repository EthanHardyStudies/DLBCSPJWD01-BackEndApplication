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
    author: {
      type: "string",
    },
    price: {
      type: "number",
    },
    priceUnit: {
      type: "string",
      enum: Object.values(bookPriceUnits),
    },
    userID: {
      type: "string"
    },
  },
  required: ["name", "description", "author", "price", "userID"],
  additionalProperties: false,
};
