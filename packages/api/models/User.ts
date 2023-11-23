// import mongoose, { Document, Schema } from 'mongoose';

// // Define a simple schema
// const userSchema = new Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

// // Define the document interface 
// interface UserDocument extends Document {
//   username: string;
//   password: string;
// }

// // Create the model
// export const UserModel = mongoose.model<UserDocument>('User', userSchema);

// import mongoose, { Document, Schema } from 'mongoose';



// const userModel = new Schema<UserDocument>({
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   email: { type: String },
// });

// interface UserDocument extends Document{
//   username: string;
//   password: string;
//   email?: string;
// }

// const User = mongoose.model<UserDocument>('User', userModel);

// export const UserModel = mongoose.model<UserDocument>('User', userModel);

import mongoose, { Document, Schema, Types } from 'mongoose';
import { UserPersonalSchedModel, userPersonalSchedDocument } from './UserPersonalSchedule';


const userModel = new Schema<UserDocument>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String },
  personalSchedules: [{ type: Types.ObjectId, ref: 'UserPersonalSchedule' }],
});

interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  personalSchedules?: userPersonalSchedDocument[] | Types.ObjectId[];
}

const UserModel = mongoose.model<UserDocument>('User', userModel);

export { UserModel, UserDocument };



