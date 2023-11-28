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
// import { UserPersonalSchedModel, userPersonalSchedDocument } from './UserPersonalSchedule';



interface ScheduleDetails {
  day: string;
  startTime: string;
  endTime: string;
  duration: string;
}

interface UserDocument extends Document {
  userToken: string;
  username: string;
  personalSchedules?: ScheduleDetails[];
}
const userModel = new Schema<UserDocument>({
  userToken: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  personalSchedules:[
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      duration: { type: String, required: true }
},]});
const UserModel = mongoose.model<UserDocument>('User', userModel);

export { UserModel, UserDocument };



