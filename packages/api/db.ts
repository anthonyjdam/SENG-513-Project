import mongoose from "mongoose";

export async function connectDB() {
    return await mongoose.connect('mongodb+srv://opengym:opengym@cluster0.ez83orx.mongodb.net/?retryWrites=true&w=majority');
}