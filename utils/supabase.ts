import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

console.log('supabaseUrl', supabaseUrl)
console.log('supabaseKey', supabaseKey)
if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);