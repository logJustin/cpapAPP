const dotenv = require('dotenv').config()

const express = require('express');
// Used to take the db file from a sql format into mongodb
// run node parser.js in the terminal to migrate the local .db file

const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');

// Set up static files and views
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const startTime = Date.now();

// Define the usage schema for Mongoose
const usageSchema = new mongoose.Schema({
    treatDate: String,
    secUsed: Number,
    secHumid: Number,
    timePB: Number,
    cntAHI: Number,
    cntOAI: Number,
    cntCAI: Number,
    cntAI: Number,
    cntHI: Number,
    cntRERA: Number,
    cntSNI: Number,
    cntBreath: Number,
    cntSelfBreath: Number,
    medPress: Number,
    medIPAP: Number,
    medEPAP: Number,
    medLEAK: Number,
    medVt: Number,
    medMV: Number,
    medRR: Number,
    medTi: Number,
    medIE: Number,
    p95Press: Number,
    p95IPAP: Number,
    p95EPAP: Number,
    p95LEAK: Number,
    p95Vt: Number,
    p95MV: Number,
    p95RR: Number,
    p95Ti: Number,
    p95IE: Number,
    maxPress: Number,
    maxIPAP: Number,
    maxEPAP: Number,
    maxLEAK: Number,
    maxVt: Number,
    maxMV: Number,
    maxRR: Number,
    maxTi: Number,
    maxIE: Number,
    maxSPO2: Number,
    minSPO2: Number,
    avgSPO2: Number,
    oxygenIndex: Number,
    actualTimeSPO2: Number,
    maxPR: Number,
    minPR: Number,
    avgPR: Number,
    aveDBP: Number,
    aveSBP: Number,
    hbpCounts: Number,
});

// Define async migrateData function to insert data into MongoDB
const migrateData = async () => {
    try {
        // Connect to the SQLite database
        const db = new sqlite3.Database(
            'C:/Users/reyno/OneDrive/Documents/iMatrix/PATIENT/000001/000001_patient.db',
            async (err) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log("Successful connection to the database '000001_patient.db'");

                    try {
                        // Connect to the MongoDB database
                        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@${process.env.MONGO_SERVER}`, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        });
                        console.log('Successful connection to the Mongo database.');

                        // Query the SQLite database
                        const sql = 'SELECT * FROM statTable';
                        db.all(sql, [], async (err, dbData) => {
                            if (err) {
                                console.error(err.message);
                            } else {
                                // Iterate over the results and save them to MongoDB
                                for (data in dbData) {
                                    dbData[data].actualTimeSPO2 = 0;
                                    const event = dbData[data];
                                    const Usage = mongoose.model('Usage', usageSchema, 'usage');

                                    // Check if the event already exists in the database
                                    const existingEvent = await Usage.findOne({ treatDate: event.treatDate });

                                    if (existingEvent) {
                                        console.log('Skipping duplicate event:', event.treatDate);
                                    } else {
                                        const usage = new Usage(event);

                                        try {
                                            await usage.save();
                                            console.log('Usage document saved successfully!', event.treatDate);
                                        } catch (error) {
                                            console.error(`Error saving usage document: ${error}`);
                                        }
                                    }
                                }
                            }

                            // Disconnect from the MongoDB database
                            await mongoose.connection.close();
                            console.log('Disconnected from the Mongo database.');

                            // Stop the server
                            server.close(() => {
                                const endTime = Date.now();
                                const totalTime = endTime - startTime;
                                const totalTimeInSecs = totalTime / 1000;
                                console.log(`Server stopped. Time elapsed: ${totalTimeInSecs} seconds`);
                                process.exit();
                            });
                        });
                    } catch (error) {
                        console.error(`Error connecting to or disconnecting from database: ${error}`);
                    }
                }
            }
        );
    } catch (error) {
        console.error(`Error connecting to database: ${error}`);
    }
};


// Start the server
const server = app.listen(3000, () => {
    console.log('Server started on port 3000');
    // Migrate data after the server has started
    migrateData();
});