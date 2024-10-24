
// Verificar no banco se tem sala existente

import { supabase } from './supabase.js'; 

export const verificarSala = async (roomCode) => {

  const { data, error } = await supabase
    .from('salas')
    .select('codigo_sala')
    .eq('codigo_sala', roomCode)
    .single();

  if (error) {
    console.error('Erro ao verificar sala:', error);
    return false; 
  }

  return data !== null;
};