const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors=require("cors")

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors())

const schema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    response: String
});
const model = mongoose.model("nextfortune", schema);

app.get("/", (req, res) => {
    res.send("dejbk");
});

app.post("/data", async (req, res) => {
    try {
        const newData = new model(req.body);
        await newData.save(); 
        res.send("Data saved successfully");
    } catch (error) {
        res.status(500).send("Error saving data: " + error.message);
    }
});

const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://mohanavamsi14:vamsi0614@cluster0.gwai5j1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully");

        const PORT = 6000; 
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};

startServer();
