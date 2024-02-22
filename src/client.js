
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://frfdmsjsbhxurlqelkfr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyZmRtc2pzYmh4dXJscWVsa2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1NzQzNTMsImV4cCI6MjAyNDE1MDM1M30.A8qq4QPIwGHOxKA23hRnfpgwySmkdqnu9C5hANzg6vk'
export const supabase = createClient(supabaseUrl, supabaseKey)