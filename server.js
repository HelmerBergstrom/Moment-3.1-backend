const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3002;

// Connect till Mongoose.
mongoose.connect("mongodb://127.0.0.1:27017/api").then(() => {
    console.log("Connected to MongoDB :)")
}).catch((error) => {
    console.log("Error connecting to database: " + error); 
}) 

// Hos vilket företag jobbade du? Vad jobbade du med? Vilken stad? Hur länge jobbade du där?
// Schema för dokumentet.

const WorkexperienceSchema = new mongoose.Schema({
    companyname: {
        type: String, 
        required: [true, "Du måste skicka med vad företaget heter!"]
    },
    task: {
        type: String,
        required: [true, "Du måste skicka med vad du jobbade med!"]
    },
    city: {
        type: String,
        required: [true, "Du måste skicka med i vilken stad du jobbade!"]
    },
    howlongY: {
        type: Number,
        required: true
    },
    howlongM: {
        type: Number,
        required: true,
        min: [0, "Mellan 0 och 11 gäller! Ändra antalet ÅR om du har under 0 månader här."],
        max: [11, "Mellan 0 och 11 gäller! Ändra antalet ÅR om du har över 11 månader här."]
    }
});

// Skapar modell. Första "Workexperience" är namnet på modellen i JS, andra är exakta namnet på min databasens collection.
// WorkexperienceSchema är det jag deklarerat ovan.
const Workexperience = mongoose.model("Workexperience", WorkexperienceSchema, "workexperience");

app.use(cors());
app.use(express.json());

app.get("/workexperience", async (req, res) => {
    try {
        const result = await Workexperience.find({}); // Lagrar alla dokument i result.

        return res.json(result); // Returnerar i json-format.
    } catch(error) {
        return res.status(500).json(error);
    }
});

app.post("/workexperience", async (req, res) => {
    try {
        const result = await Workexperience.create(req.body); // skapar och sparar nytt dokument.

        if (!result) {
            return res.status(404).json({ message: "Fel! Försök igen." });
        }

        return res.json({ message: "Erfarenheten har sparats!", data: result }); 
    } catch(error) {
        return res.status(400).json(error);
    }
});

app.put("/workexperience/:id", async (req, res) => {
    try {
        // "new: true" för att returnera det uppdaterade dokumentet. 
        // "runValidators: true" för att valideringarna ska köras.
        const result = await Workexperience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!result) {
        return res.status(404).json({ message: "Fel! Försök igen." });
        }

        return res.json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
});

app.delete("/workexperience/:id", async (req, res) => {
    try {
        // Hittar erfarenhet och raderar den utifrån ID:t som skickas med.
        const result = await Workexperience.findByIdAndDelete(req.params.id);
        
        if (!result) {
        return res.status(404).json({ message: "Dokument hittades inte" });
        }
        console.log("Tar bort erfarenhet med id:", req.params.id);
        return res.json({ message: "Erfarenheten är nu raderad!" });
    } catch(error) {
        return res.status(400).json(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ` + port);
})