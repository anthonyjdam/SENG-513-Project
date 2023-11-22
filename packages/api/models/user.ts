import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    favouriteTime: {
        startTime: String,
        endTime: String,
    }
});

module.exports = mongoose.model('User', userSchema);