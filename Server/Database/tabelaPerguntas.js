
//Consulta tabela das perguntas

import { supabase } from './supabase.js'

export async function tabelaPerguntas() {
  const { data, error } = await supabase
    .from('perguntas')
    .select('pergunta, respCorreta, respIncorreta1, respIncorreta2, respIncorreta3') 
    .eq('codigo_sala', 123);

  if (error) {
    console.error('Erro ao buscar dados:', error)
    return null

  } else {
    return data
  }
}