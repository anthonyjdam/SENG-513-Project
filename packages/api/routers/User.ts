import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    token: String,
    preferences: {
        date: String,
        startTime: String,
        endTime: String,
    }
});

module.exports = mongoose.model('User', userSchema);