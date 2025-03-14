const Express = require("express");
const cors = require('cors')
const app = Express();
app.use(cors())
const { connectDB, getDB } = require("./db")
const { port } = require("./config");
const PORT = process.env.PORT || port;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // middleware to read body, parse it and place results in req.body
app.use(Express.json());             // for application/json
app.use(Express.urlencoded({ extended: true }));       // for application/x-www-form-urlencoded

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const BookRoutes = require("./books/routes");

// Connect to MongoDB
connectDB();

//method to check if API is running
app.get('/status', (request, response) => {
    const status = {
        "Status": "Running"
    };

    response.send(status)
});

//Use routes for other parts of API
app.use("/", AuthorizationRoutes);
app.use("/user", UserRoutes);
app.use("/book", BookRoutes);
