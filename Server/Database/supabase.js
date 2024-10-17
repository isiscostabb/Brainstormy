
//Conexão banco

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ujonjxtfznogbjvycvom.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqb25qeHRmem5vZ2Jqdnljdm9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMDY4NDMsImV4cCI6MjA0NDY4Mjg0M30.bJJmEknvhLWspZ1U5AzYsm_nr05HKSDc-GENoJ22TWw'

export const supabase = createClient(supabaseUrl, supabaseKey)