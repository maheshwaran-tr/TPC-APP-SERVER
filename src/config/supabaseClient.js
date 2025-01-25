import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";

dotenv.config()

const supabaseKey = process.env.SUPABASE_KEY
const projectUrl = process.env.SUPABASE_URL

const supabase = createClient(projectUrl, supabaseKey)

export default supabase;