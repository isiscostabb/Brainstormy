
import { supabase } from './supabase.js'

async function getData() {
  const { data, error } = await supabase
    .from('salas')
    .select('*')

  if (error) {
    console.error(error)
  } else {
    console.log(data)
  }
}

getData()