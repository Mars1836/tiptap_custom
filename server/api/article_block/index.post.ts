import { getSupabaseClient } from "@/supabase/client";
import { errorMessages } from "vue/compiler-sfc";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = getSupabaseClient();
  console.log(body);
  const { data, error } = await supabase.from("article_block").insert(body);
  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
  return data;
});
