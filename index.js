const express = require("express"); 
const bodyParser = require("body-parser"); // Corrected casing for body-parser
const { connectToDatabase } = require("./dbconfig"); // Corrected casing and added curly braces around connectToDatabase

require("dotenv").config();
console.log(process.env);

connectToDatabase();
const http_server = express();

http_server.use(bodyParser.json()); // Corrected casing for bodyParser
http_server.use("/api", require("./Controllers/Task.controllers")); // Corrected casing for Task.controllers

// starts a simple http server locally on port 3000
http_server.listen(process.env.PORT, process.env.HOSTNAME, () => {
  console.log("Server started");
});
