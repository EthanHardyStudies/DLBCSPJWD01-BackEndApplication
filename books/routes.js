const express = require("express");
const router = express.Router();

// Controller Imports
const BookController = require("./controllers/BookController");

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// JSON Schema Imports for payload verification
const createBookPayload = require("./schemas/createBookPayload");
const updateBookPayload = require("./schemas/updateBookPayload");
const { roles } = require("../config");

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  BookController.getAllBooks
);

router.post(
  "/addBook",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(createBookPayload),
  ],
  BookController.createBook
);

router.patch(
  "/updateBook",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    SchemaValidationMiddleware.verify(updateBookPayload),
  ],
  BookController.updateBook
);

router.delete(
  "/removeBook",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  BookController.deleteBook
);

module.exports = router;
