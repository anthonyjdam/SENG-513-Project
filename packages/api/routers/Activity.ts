import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activityName: String,
    location: String,
    date: String,
    startTime: String,
    endTime: String,
});

module.exports = mongoose.model('Activity', activitySchema);