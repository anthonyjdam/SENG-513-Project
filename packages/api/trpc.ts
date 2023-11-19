import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

// Created for each request
const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({
  
    // TODO: CREATE context for each request where we provide the auth session and the db connection
  
  }); // no context
type Context = inferAsyncReturnType<typeof createContext>;


const t = initTRPC.context<Context>().create(); // create an instance of the tRPC server
export const router = t.router; // define router based on tRPC instance 
export const publicProcedure = t.procedure; // export alias of t.procedure as publicProcedure

