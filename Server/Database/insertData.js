
//Inserir dados na tabela

import { supabase } from './supabase.js'

async function insertData() {
  const { data, error } = await supabase
    .from('salas')
    .insert([
      { codigo_sala: '3' }  
    ])

  if (error) {
    console.error('Erro ao inserir dados:', error)
  } else {
    console.log('Dados inseridos com sucesso:', data)
  }
}

insertData()