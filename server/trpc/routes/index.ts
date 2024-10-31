import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { articleRouter } from "./article";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
  article: articleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
