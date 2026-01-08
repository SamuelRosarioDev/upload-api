import 'dotenv/config'; // Adicione isso no topo
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL e Key são obrigatórios no .env');
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
});