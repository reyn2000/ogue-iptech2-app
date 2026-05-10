import { createClient } from "@supabase/supabase-js";


const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxbXZjeG9sb2RnaWRpa2pqa2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzgzNzAsImV4cCI6MjA5Mzk1NDM3MH0.J7cG9SGLSrhctFI8BRWLr-Aq2xklUs_7t-eraie95CM"; // Your anonKey also known as API key
const supabaseUrl = "https://lqmvcxolodgidikjjkhd.supabase.co"; //Your URL here


export const supabase = createClient(supabaseUrl, supabaseAnonKey);