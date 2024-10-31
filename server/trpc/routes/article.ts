// server/trpc/routers/todo.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { getSupabaseClient } from "~/supabase/client";

// Định nghĩa các endpoint cho "todo"
export const articleRouter = router({
  getAll: publicProcedure.query(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from("articles").select("*");
    return data;
  }),

  //   create: publicProcedure
  //     .input(
  //       z.object({
  //         text: z.string(),
  //       })
  //     )
  //     .mutation(({ input }) => {
  //       // logic để tạo todo
  //       return { id: Date.now(), text: input.text };
  //     }),

  //   update: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.number(),
  //         text: z.string(),
  //       })
  //     )
  //     .mutation(({ input }) => {
  //       // logic để cập nhật todo
  //       return { id: input.id, text: input.text };
  //     }),

  //   delete: publicProcedure
  //     .input(
  //       z.object({
  //         id: z.number(),
  //       })
  //     )
  //     .mutation(({ input }) => {
  //       // logic để xóa todo
  //       return { success: true };
  //     }),
});
