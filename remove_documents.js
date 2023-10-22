const dotenv = require('dotenv').config()
const mongoose = require('mongoose');

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

// Connect to the MongoDB database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@${process.env.MONGO_SERVER}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Define the Usage model based on your schema
        const Usage = mongoose.model('Usage', usageSchema, 'usage');

        // Delete all documents from the 'usage' collection
        Usage.deleteMany({})
            .then((result) => {
                console.log(`Deleted ${result.deletedCount} documents from the 'usage' collection`);
            })
            .catch((error) => {
                console.error('Error deleting documents:', error);
            })
            .finally(() => {
                // Close the MongoDB connection
                mongoose.connection.close()
                    .then(() => {
                        console.log('Disconnected from MongoDB');
                    })
                    .catch((error) => {
                        console.error('Error disconnecting from MongoDB:', error);
                    });
            });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
