import { getSupabaseClient } from "@/supabase/client";
import { buildHierarchy } from "~/server/service/categories/buildHierarchy";
import { Category } from "~/types";

export default defineEventHandler(async (event) => {
  const supabase = getSupabaseClient();

  // Truy vấn tất cả dữ liệu từ bảng categories
  const { data: categories, error } = await supabase
    .from("categories")
    .select("id, title, path, articles(id, title, content)")
    .order("path", { ascending: true });

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  const hierarchy = buildHierarchy(categories as unknown as Category[]);

  return hierarchy;
});
