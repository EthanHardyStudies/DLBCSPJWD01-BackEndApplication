const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb://127.0.0.1:27017/db';

let db;

const connectDB = async () => {
    if (db) {
        console.log("Database already initialized.");
        return;
      }
    
    try {
      const client = new MongoClient(mongoURI);
  
      //connect to mongodb instance
      await client.connect();
      db = client.db(); // Auto-selects database from URI
      console.log("MongoDB Connected...");
    } catch (error) {
      console.error("MongoDB Connection Error:", error);
      process.exit(1);
    }
  };

  //returns db connection to controller for use.
const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };