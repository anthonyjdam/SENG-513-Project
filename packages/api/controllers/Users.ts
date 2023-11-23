import { Request, Response } from 'express';
import { UserModel, UserDocument } from '../models/User'; // Adjust the path accordingly
import { z } from 'zod';

// Zod schema for user input validation
const createUserSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  email: z.string().email().optional(),
  personalSchedules: z.array(z.string()).optional(),
});

// Create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, personalSchedules } = createUserSchema.parse(req.body);

    const newUser: UserDocument = new UserModel({
      username,
      password,
      email,
      personalSchedules,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
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