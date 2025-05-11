const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Connect till Mongoose.
mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
}) 

// Hos vilket företag jobbade du? Vad jobbade du med? Vilken stad? Hur länge jobbade du där?

const WorkexperienceSchema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: [true, "Du måste skicka med vad företaget heter"]
    },
    task: {
        type: String,
        required: [true, "Du måste skicka med vad du jobbade med"]
    },
    city: {
        type: String,
        required: [true, "Du måste skicka med i vilken stad du jobbade"]
    },
    howlong: {
        type: Number,
        required: [true, "Du måste skicka med hur länge du jobbade"]
    }
});

const Workexperience = mongoose.model("Workexperience", WorkexperienceSchema);

app.use(cors());
app.use(express.json());

app.get("/workexperience", async (req, res) => {
    try {
        let result = Workexperience.find({});

        return res.json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
});

app.post("/workexperience", async (req, res) => {
    try {
        let result = Workexperience.create(req.body)

        return res.json(result);

    } catch(error) {
        return res.status(400).json(error);
    }
});

app.put("/workexperience/:id", async (req, res) => {
    try {


    } catch(error) {
        return res.status(400).json(error);
    }
});

app.delete("/workexperience/:id", async (req, res) => {
    try {
        
    } catch(error) {
        return res.status(400).json(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ` + port);
})