const BookModel = require("../../common/models/Books");

module.exports = {
  getAllBooks: (req, res) => {
    var user = req.query.userID;
    BookModel.getAllBooks(user)
      .then((Books) => {
        return res.status(200).json({
          status: true,
          data: Books.books,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createBook: (req, res) => {
    const { body } = req;

    BookModel.createBook(body)
      .then((Book) => {
        return res.status(200).json({
          status: true,
          data: Book,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  updateBook: (req, res) => {
    const BookId = req.query.id;
    var payload = req.body;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Book.",
        },
      });
    }

    BookModel.updateBook(BookId, payload)
      .then(() => {
        return BookModel.findBook(BookId);
      })
      .then((Book) => {
        return res.status(200).json({
          status: true,
          data: Book,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteBook: (req, res) => {
    var BookId = req.query.id;
    BookModel.deleteBook(BookId)
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfBooksDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
