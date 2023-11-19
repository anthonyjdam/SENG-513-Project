import { publicProcedure, router } from "../../api/trpc"

export const appRouter = router({
    getHello: publicProcedure.query(() => {
      return [1, 2, 4, 5, 6];
    }),
});
