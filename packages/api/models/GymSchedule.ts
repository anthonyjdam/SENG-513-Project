import mongoose, { Document, Schema } from 'mongoose';


const gymScheduleModel = new Schema<GymScheduleDocument>({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  activityName: { type: String, required: true },
  duration: { type: String, required: true }
  
});

interface GymScheduleDocument extends Document {
    date: String;
    startTime: string;
    endTime: string;
    location: string;
    activityName: string;
    duration: string;
  }

const GymScheduleModel = mongoose.model<GymScheduleDocument>('GymSchedule', gymScheduleModel);

export { GymScheduleModel };