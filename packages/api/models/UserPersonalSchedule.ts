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

// import mongoose, { Document, Schema } from 'mongoose';

// const userPersonalSchedModel = new Schema<userPersonalSchedDocument>({
//   week: [
//     {
//       day: { type: String, required: true },
//       startTime: { type: String, required: true },
//       endTime: { type: String, required: true },
//     },
//   ],
// });

// interface userPersonalSchedDocument extends Document {
//   week: {
//     day: string;
//     startTime: string;
//     endTime: string;
//   }[];
// }

// const UserPersonalSchedModel = mongoose.model<userPersonalSchedDocument>('UserPersonalSchedule', userPersonalSchedModel);

// export { UserPersonalSchedModel, userPersonalSchedDocument };




// import mongoose, { Document, Schema } from 'mongoose';

// interface ScheduleDetails {
//   day: string;
//   startTime: string;
//   endTime: string;
// }

// interface userPersonalSchedDocument extends Document {
//   monthNumber: number;
//   schedules: {
//     weekNumber: number;
//     days: ScheduleDetails[];
//   }[];
// }

// const userPersonalSchedModel = new Schema<userPersonalSchedDocument>({
//   monthNumber: { type: Number, required: true },
//   schedules: [
//     {
//       weekNumber: { type: Number, required: true },
//       days: [
//         {
//           day: { type: String, required: true },
//           startTime: { type: String, required: true },
//           endTime: { type: String, required: true },
//         },
//       ],
//     },
//   ],
// });

// const UserPersonalSchedModel = mongoose.model<userPersonalSchedDocument>('UserPersonalSchedule', userPersonalSchedModel);

// export { UserPersonalSchedModel, userPersonalSchedDocument };




// import mongoose, { Document, Schema } from 'mongoose';

// const userPersonalSchedModel = new Schema<userPersonalSchedDocument>({
//   date: { type: Date, required: true },
//   startTime: { type: String, required: true },
//   endTime: { type: String, required: true },
  
// });

// // Schema for the user's personal schedule
// interface userPersonalSchedDocument extends Document {
//   date: Date;
//   startTime: string;
//   endTime: string;
//   }


// const UserPersonalSchedModel = mongoose.model<userPersonalSchedDocument>('UserPersonalSched', userPersonalSchedModel);

//  export { UserPersonalSchedModel, userPersonalSchedDocument };
