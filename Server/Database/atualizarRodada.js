import { supabase } from './supabase.js';

export async function atualizarRodada(codigoSala, nomeJogador, pontuacao, categoria) {

    try { 

        // Verificação existência do jogador
        const { data: jogadorExistente } = await supabase
            .from('dados_jogadores')
            .select('id_jogador, pontuacao')
            .eq('nome', nomeJogador)
            .single();

        // Se jogador já existe
        if (jogadorExistente) {
            console.log('Jogador já existe:', jogadorExistente); // Exibe dados do jogador existente no console

            // Atualiza pontuação e categoria
            const { data: jogadorAtualizado } = await supabase
                .from('dados_jogadores')
                .update({ 
                    pontuacao: pontuacao,
                    funcao: categoria
                })
                .eq('id_jogador', jogadorExistente.id_jogador)
                .select('nome, pontuacao, funcao, id_jogador')
                .single();

            console.log('Atualização feita.');

            // Retorna a pontuação atualizada do jogador
            return jogadorAtualizado.pontuacao; // Retorna a pontuação atualizada
        } else { 
            console.error('Erro ao inserir dados do jogador.');
            return null; // Se jogador não existe, retorna null
        }
    } catch (error) {
        console.error('Erro inesperado:', error);
        return null;
    }
}
