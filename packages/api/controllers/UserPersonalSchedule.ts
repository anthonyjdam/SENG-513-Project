import { Request, Response } from 'express';
import { UserPersonalSchedModel, userPersonalSchedDocument } from '../models/UserPersonalSchedule'; // Adjust the path accordingly
import { z } from 'zod';

// Zod schema for user personal schedule input validation
const createUserPersonalSchedSchema = z.object({
  week: z.array(
    z.object({
      day: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

// Create a user personal schedule
export const createUserPersonalSchedule = async (req: Request, res: Response) => {
  try {
    const { week } = createUserPersonalSchedSchema.parse(req.body);

    const newUserPersonalSched: userPersonalSchedDocument = new UserPersonalSchedModel({
      week,
    });

    const savedUserPersonalSched = await newUserPersonalSched.save();

    res.status(201).json(savedUserPersonalSched);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      console.error(error.errors);
      res.status(400).json({ error: 'Invalid input format' });
    } else {
      // Other unexpected errors
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
// Get all user personal schedules
export const getAllUserPersonalSchedules = async (req: Request, res: Response) => {
  try {
    const userPersonalSchedules = await UserPersonalSchedModel.find();

    res.status(200).json(userPersonalSchedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a user personal schedule by ID
export const getUserPersonalScheduleById = async (req: Request, res: Response) => {
  const { personalSchedId } = req.params;

  try {
    const userPersonalSched = await UserPersonalSchedModel.findById(personalSchedId);

    if (!userPersonalSched) {
      return res.status(404).json({ error: 'User personal schedule not found' });
    }

    res.status(200).json(userPersonalSched);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a user personal schedule by ID
export const updateUserPersonalScheduleById = async (req: Request, res: Response) => {
  const { personalSchedId } = req.params;
  const { week } = req.body;

  try {
    const updatedUserPersonalSched = await UserPersonalSchedModel.findByIdAndUpdate(
      personalSchedId,
      { week },
      { new: true, runValidators: true }
    );

    if (!updatedUserPersonalSched) {
      return res.status(404).json({ error: 'User personal schedule not found' });
    }

    res.status(200).json(updatedUserPersonalSched);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a user personal schedule by ID
export const deleteUserPersonalScheduleById = async (req: Request, res: Response) => {
  const { personalSchedId } = req.params;

  try {
    const deletedUserPersonalSched = await UserPersonalSchedModel.findByIdAndDelete(personalSchedId);

    if (!deletedUserPersonalSched) {
      return res.status(404).json({ error: 'User personal schedule not found' });
    }

    res.status(200).json({ msg: 'User personal schedule successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
