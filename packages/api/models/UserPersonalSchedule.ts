// import mongoose, { Document, Schema } from 'mongoose';

// const userPersonalSchedModel = new Schema<userPersonalSchedDocument>({
//   day: { type: String, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
// });

// // Schema for the user's personal schedule
// interface userPersonalSchedDocument extends Document {
//     day: string;
//     startTime: string;
//     endTime: string;
//   }

// const UserPersonalSchedModel = mongoose.model<userPersonalSchedDocument>('UserPersonalSched', userPersonalSchedModel);

// export default UserPersonalSchedModel;

import mongoose, { Document, Schema } from 'mongoose';

const userPersonalSchedModel = new Schema<userPersonalSchedDocument>({
  week: [
    {
      day: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
});

interface userPersonalSchedDocument extends Document {
  week: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
}

const UserPersonalSchedModel = mongoose.model<userPersonalSchedDocument>('UserPersonalSchedule', userPersonalSchedModel);

export { UserPersonalSchedModel, userPersonalSchedDocument };