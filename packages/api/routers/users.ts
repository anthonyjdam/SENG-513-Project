import { publicProcedure, router } from "../server"
import { validateUsername } from "../middleware";


export const usersRouter = router({
    getUcid: publicProcedure.query(() => {
        return { ucid: "30121212"}
    }),

    createUsername: validateUsername.mutation(( input ) => {
        console.log(input);
        return { username: input}
    }),

    getPassword: publicProcedure.query(() => {
        return { password: "qwerty" }
    }),
    
});
