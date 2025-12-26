import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASEURL,
  process.env.SUPABASEANONKEY
);

export default supabase;
