import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { connectDB } from "./db";
import { UserModel } from "./db/User";

const PORT = process.env.port || 5000;

// created for each request
const createContext = ({
  req,
	res,
}: trpcExpress.CreateExpressContextOptions) => ({
  // TODO: CREATE context for each request where we provide the auth session and the db connection
}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

import { validateScrape } from "./middleware";
import { usersRouter } from "./users";


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
        getHello: publicProcedure.query(() => {
		return [1, 2, 4, 5, 6];
	}),

	changeName: publicProcedure
		.input(z.object({ username: z.string() }))
		.mutation(({ ctx, input }) => {
			console.log(input.username);
		}),

	createActivity: validateScrape.mutation(({ ctx, input }) => {
		console.log(`client says: ${input.startTime}`);
	}),

  users: usersRouter
	// TODO: Make procedures, ideally in another file for organization
});

// export type definition of API
export type AppRouter = typeof appRouter;

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

// try {
// 	connectDB();

// 	// Example: Creating a new user
// 	const newUser = new UserModel({
// 		username: "john_doe",
// 		password: "secure_password",
// 	});

// 	newUser
// 		.save()
// 		.then((savedUser) => {
// 			console.log("User saved successfully:", savedUser);
// 		})
// 		.catch((error) => {
// 			console.error("Error saving user:", error);
// 		});
// } catch (err) {
// 	console.log(err);
// }
