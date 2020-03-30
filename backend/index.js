const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connectDB = require("./config/db")

require('dotenv').config()

connectDB();

app.use(bodyParser.json());
app.use("/api/auth", require("./router/auth"))
app.use("/api/dashboard", require("./router/dashboard"))


app.listen(5000, () => {
    console.log("Server is running on port 5000")
})