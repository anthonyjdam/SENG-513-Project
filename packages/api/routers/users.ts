import { publicProcedure, router } from "../../api/trpc"
import { validateUsername } from "../middleware";



export const usersRouter = router({
    getUcid: publicProcedure.query(() => {
        return { ucid: "30121212"}
    }),

    createUsername: validateUsername.mutation(( input ) => {
        return { username: input}
    }),

    getPassword: publicProcedure.query(() => {
        return { password: "qwerty" }
    }),
    
});
