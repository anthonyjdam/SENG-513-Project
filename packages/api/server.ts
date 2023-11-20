import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers/index"


/*Initialize tRPC API*/

// Created for each request
export const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
  
    // TODO: CREATE context for each request where we provide the auth session and the db connection
  
  }); // no context

type Context = inferAsyncReturnType<typeof createContext>; // infer the return type og the create context function
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