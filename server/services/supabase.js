import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kzimzhnrtrbbjvippewy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aW16aG5ydHJiYmp2aXBwZXd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzAyNTIsImV4cCI6MjA2NTkwNjI1Mn0.Uq4Zo4SBqzJ7GsBGltGixMXMFTV041YpnuuNFZY9308";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
