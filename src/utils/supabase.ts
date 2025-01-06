import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://mgyotrqqkdfexrbdldxc.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1neW90cnFxa2RmZXhyYmRsZHhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTAyNDYsImV4cCI6MjA1MTcyNjI0Nn0.tY506jOaoWkHN5dR2rwNsXtnbvWJA7AVLV3T3KB8XFc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
