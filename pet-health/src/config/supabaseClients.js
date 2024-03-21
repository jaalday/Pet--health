import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SOURCE_SUPABASE_URL,

  // import.meta.env.VITE_SOURCE_KEY
  import.meta.env.VITE_SERVICE_KEY
);

export default supabase;
