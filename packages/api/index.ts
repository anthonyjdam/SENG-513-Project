import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = process.env.port || 5000;

/*Initialize tRPC API*/

const createContext = ({
	req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({
	// TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context

type Context = inferAsyncReturnType<typeof createContext>; // infer the return type of the create context function
export const t = initTRPC.context<Context>().create(); // create an instance of the tRPC server
export const publicProcedure = t.procedure; // export alias of t.procedure as publicProcedure
export const router = t.router; // define router based on tRPC instance 


export const appRouter = t.router({
	//   getUser: t.procedure.input(z.string()).query((opts) => {
	//     opts.input; // string
	//     return { id: opts.input, name: 'Bilbo' };
	//   }),
	//   createUser: t.procedure
	//     .input(z.object({ name: z.string().min(5) }))
	//     .mutation(async (opts) => {
	//       // use your ORM of choice
	//       return await UserModel.create({
	//         data: opts.input,
	//       });
	//     }),
	getHello: t.procedure.query(() => {
		return [1, 2, 4, 5, 6];
	}),

	changeName: t.procedure
		.input(z.object({ username: z.string() }))
		.mutation(({ ctx, input }) => {
			console.log(input.username);
		}),

	createActivity: t.procedure
		.input(z.object({
			activity: z.string(),
			startTime: z.string(),
			endTime: z.string(),
			date: z.string(),
			location: z.string(),
		}))
		.mutation(({ ctx, input }) => {
			console.log(`client says: ${input.startTime}`)
		}),

	// TODO: Make procedures, ideally in another file for organization
});

// Export type definition of API
export type AppRouter = typeof appRouter;


/*Initialize Express server*/

const app = express();
app.use(cors());

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	})
);

app.get("/", (req, res) => {
	res.send("Hello");
});

app.listen(PORT, () => {
	console.log("listening on port " + PORT);
});


/** Connect to mongoDB database */
mongoose.connect(process.env.MONGO_URI || "http://localhost:5000/trpc"); // default to localhost
const db = mongoose.connection;

db.on('error', (error) => console.error(error)); // log error when failing to connect to databse
db.once('open', () => console.log("Connected to Databse"));
db.on('disconnected', () => console.log('Disconnected from MongoDB.'));

app.use(express.json());
