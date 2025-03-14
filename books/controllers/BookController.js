const BookModel = require("../../common/models/Books");

module.exports = {
  getAllBooks: (req, res) => {
    //parse query info from payload
    var user = req.query.userID;
    //call model processs method
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
    //assign payload to variable
    const { body } = req;

    //call model processs method
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
    //parse query info from payload and assign paylaod to variable
    const BookId = req.query.id;
    var payload = req.body;

    // If the payload does not have any keys,
    // Then we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the Book.",
        },
      });
    }

    //call model processs method
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
    //parse query info from payload
    var BookId = req.query.id;
    //call model processs method
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
