const { Int32 } = require("mongodb");
const { roles } = require("../../config");
const { getDB } = require("../../db");

const UserModel = {
  id: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  age: {
    type: Int32
  },
  role: {
    type: String,
    defaultValue: roles.USER
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
};

module.exports = {
  createUser: async (user, res) => {
    //Initialise mongodb collection
    const db = getDB();
    const usersCollection = db.collection("users");
    try{
      //call collection with payload
      const result = await usersCollection.insertOne(user);
      return { message: "User created successfully", userId: result.insertedId };
    }
    catch(err){
      console.log(err)
    }
  },

  findUser: async (query) => {
    //Initialise mongodb collection
    const db = getDB();
    const usersCollection = db.collection("users");
    try {
      //call collection with query
      const result = usersCollection.find(query);
      return result.toArray();
    }
    catch (err){
      return res.status(500).json({status: false,error: err,});
    }
  },

  findUserById: async (query) => {
    //Initialise mongodb collection
    const db = getDB();
    const usersCollection = db.collection("users");
    try {
      //create object id query
      var ObjectId = require('mongodb').ObjectId; 
      var id = query;  
      var o_id = new ObjectId(id);

      //call collection with query
      const result = usersCollection.find({_id:o_id});
      return result.toArray();
    }
    catch (err){
      return res.status(500).json({status: false,error: err,});
    }
  },

  updateUser: async (query, updatedValue) => {
    //Initialise mongodb collection
    const db = getDB();
    const usersCollection = db.collection("users");
    try {
      //create object id query
      var ObjectId = require('mongodb').ObjectId; 
      var o_id = new ObjectId(query)
      //call collection with payload and query
      const result = await usersCollection.updateOne(
        { _id:o_id },
        {
          $set: {
            firstName: updatedValue.firstName,
            lastName: updatedValue.lastName,
            email: updatedValue.email,
            age: updatedValue.age
          }
        }
      );
      return { message: "User updated", user: result};
    }
    catch (err){
      return res.status(500).json({status: false,error: err,});
    }

  },

  deleteUser: async (query) => {
    //Initialise mongodb collection
    const db = getDB();
    const usersCollection = db.collection("users");
    try {
      //call collection with query
      const result = await usersCollection.deleteOne({ query });
      return { message: 'User deleted', result };
    } catch (err) {
      res.status(500).json({ message: 'Error deleting user', error: err });
    }
  }
};
