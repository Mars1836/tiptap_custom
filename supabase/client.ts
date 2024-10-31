// supabaseClient.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";

let supabase: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (!supabase) {
    const config = useRuntimeConfig();
    supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey
    );
  }
  return supabase;
};
