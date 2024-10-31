import { getSupabaseClient } from "@/supabase/client";

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
  return data;
});
