const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/health_data_db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define schema for health data
const healthDataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    usn: String,
    height: String,
    weight: String,
    bloodGroup: String,
});

// Define model
const HealthData = mongoose.model('HealthData', healthDataSchema);

// Routes
app.post('/logData', async (req, res) => {
    try {
        const { name, age, gender, usn, height, weight, bloodGroup } = req.body;
        const newData = new HealthData({ name, age, gender, usn, height, weight, bloodGroup });
        await newData.save();
        res.status(201).send('Data logged successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging data.');
    }
});

app.get('/getData', async (req, res) => {
    try {
        const data = await HealthData.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data.');
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
