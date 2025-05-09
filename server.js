const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect till Mongoose.
mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    console.log("connected to mongoDB")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
}) 

app.use(cors());
app.use(express.json());

app.get("/api", async (req, res) => {
    res.json({ message: "Welcommen!" });
})

app.listen(port, () => {
    console.log(`Server is running: ` + port);
})