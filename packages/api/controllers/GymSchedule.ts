import { Request, Response } from 'express';
import { GymScheduleModel} from '../models/GymSchedule'; 
import mongoose from 'mongoose';
import { z } from 'zod';

const gymScheduleSchema = z.object({
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string(),
  activityName: z.string(),
});

// Create a gym schedule
export const createGymSchedule = async (req: Request, res: Response) => {
  try {
    const { date, startTime, endTime, location, activityName } = req.body;

    // Validate incoming data using Zod schema
    try {
      gymScheduleSchema.parse({ date, startTime, endTime, location, activityName });
    } catch (validationError) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const newGymSchedule = await GymScheduleModel.create({
      date,
      startTime,
      endTime,
      location,
      activityName,
    });

    res.status(201).json(newGymSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllGymSchedules = async (req: Request, res: Response) => {
    try {
      const gymSchedules = await GymScheduleModel.find({});
      res.status(200).json(gymSchedules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };