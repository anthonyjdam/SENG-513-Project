import mongoose, { Document, Schema } from 'mongoose';

// Define a simple schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// Define the document interface 
interface UserDocument extends Document {
  username: string;
  password: string;
}

// Create the model
export const UserModel = mongoose.model<UserDocument>('User', userSchema);

