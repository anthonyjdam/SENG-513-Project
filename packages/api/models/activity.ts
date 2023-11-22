import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    activity: String,
    location: String,
    date: Date,
    startTime: String,
    endTime: String,
});

module.exports = mongoose.model('Activity', activitySchema);