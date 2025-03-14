const { Int32, Double } = require("mongodb");
const { bookPriceUnits } = require("../../config");
const { getDB } = require("../../db");

const BookModel = {
  id: {
    type: Int32
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Int32
  },
  priceUnit: {
    type: String,
    defaultValue: bookPriceUnits.ZAR,
  },
  isbnID: {
    type: String,
    defaultValue: bookPriceUnits.ZAR,
  },
  author: {
    type: String,
    defaultValue: bookPriceUnits.ZAR,
  },
  userID: {
    type: String,
    defaultValue: bookPriceUnits.ZAR,
  },
};

module.exports = {
  createBook: async (book) => {    
    //Initialise mongodb collection
    const db = getDB();
    const booksCollection = db.collection("books");
    try {
      //call collection with payload
      const result = await booksCollection.insertOne(book);
      return { message: "Book entry created", book: result }
    }
    catch (err){
      return res.status(500).json({status: false,error: err,});
    }
  },

  findBook: (id) => {    
    //Initialise mongodb collection
    const db = getDB();
    const booksCollection = db.collection("books");
    try {
      //create object id query
      var ObjectId = require('mongodb').ObjectId; 
      var o_id = new ObjectId(id)
      //call collection with query
      const result = booksCollection.find({_id:o_id});
      return { message: "Book retrieved", book: result.toArray() }
    }
    catch (err){
      return res.status(500).json({status: false,error: err,});
    }
  },

  updateBook: async (id, updatedValue) => {    
    //Initialise mongodb collection
    const db = getDB();
    const booksCollection = db.collection("books");
    try {
      //create object id query
      var ObjectId = require('mongodb').ObjectId; 
      var o_id = new ObjectId(id)

      //call collection with query and payload
      const result = await booksCollection.replaceOne(
        {_id:o_id},
        updatedValue 
      )
      return { message: "Book entry updated", book: result }
    }
    catch (err){
      res.status(500).json({ message: 'Error fetching books', error: err });
    }
  },

  getAllBooks: async (user) => {    
    //Initialise mongodb collection
    const db = getDB();
    const booksCollection = db.collection("books");
    try {
      //call collection with query
      const result = await booksCollection.find({userID:user}).toArray();
      return { message: "Retrieved all books", books: result }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching books', error: err });
    }
  },

  deleteBook: async (id) => {    
    //Initialise mongodb collection
    const db = getDB();
    const booksCollection = db.collection("books");
    try {
      //create object id query
      var ObjectId = require('mongodb').ObjectId; 
      var o_id = new ObjectId(id)
      //call collection with query
      const result = await booksCollection.deleteOne({_id:o_id});
      return { message: "Book deleted", book: result }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting book', error: err });
    }
  }
}
