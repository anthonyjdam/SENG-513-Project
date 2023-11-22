import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index"
require('dotenv').config();


/*Initialize tRPC API*/

// Created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
  
    // TODO: CREATE context for each request where we provide the auth session and the db connection
  
  }); // no context

type Context = inferAsyncReturnType<typeof createContext>; // infer the return type of the create context function
const t = initTRPC.context<Context>().create(); // create an instance of the tRPC server
export const router = t.router; // define router based on tRPC instance 
export const publicProcedure = t.procedure; // export alias of t.procedure as publicProcedure


/*Initialize Express server*/

const PORT = process.env.port || 5000;
const app = express();

export type AppRouter = typeof appRouter;

app.use(cors());

app.use(
    '/trpc', createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

/* Connect to mongoDB database */
mongoose.connect(process.env.DATABASE_URL || "http://localhost:5000/trpc"); // default to localhost
const db = mongoose.connection;

db.on('error', (error) => console.error(error)); // log error when failing to connect to databse
db.once('open', () => console.log("Connected to Databse"));
db.on('disconnected', () => console.log('Disconnected from MongoDB.'));

app.use(express.json());
