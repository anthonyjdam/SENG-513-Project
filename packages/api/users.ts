import { publicProcedure, router } from "./index"

export const usersRouter = router({
    getUcid: publicProcedure.query(() => {
        return { ucid: "30121212"}
    }),

    getPassword: publicProcedure.query(() => {
        return { password: "qwerty" }
    }),
    
});