// Função para excluir os dados de um jogador ao sair

import { supabase } from './supabase.js';

export async function excluirJogador(nomeJogador) {
    try {
        // Primeiro, verificar se o jogador existe
        const { data: jogadorExistente, error: erroVerificar } = await supabase
            .from('dados_jogadores')
            .select('id_jogador')
            .eq('nome', nomeJogador)
            .single();

        // Se não encontrar o jogador, ou ocorrer erro
        if (erroVerificar) {
            console.error('Erro ao verificar jogador:', erroVerificar);
            return null;
        }

        if (!jogadorExistente) {
            console.log('Jogador não encontrado.');
            return null; // Jogador não encontrado
        }

        // Se o jogador foi encontrado, exclua o registro dele
        const { error: erroExcluir } = await supabase
            .from('dados_jogadores') // Tabela onde os dados do jogador estão armazenados
            .delete()
            .eq('id_jogador', jogadorExistente.id_jogador); // Exclui com base no id_jogador

        // Verificar se ocorreu erro na exclusão
        if (erroExcluir) {
            console.error('Erro ao excluir dados do jogador:', erroExcluir);
            return null;
        }

        // Opcional: Se também quiser excluir da tabela 'jogadores' (caso seja necessário)
        const { error: erroExcluirJogador } = await supabase
            .from('jogadores')
            .delete()
            .eq('id_jogador', jogadorExistente.id_jogador); // Exclui com base no id_jogador

        if (erroExcluirJogador) {
            console.error('Erro ao excluir jogador da tabela "jogadores":', erroExcluirJogador);
            return null;
        }

        console.log('Jogador excluído com sucesso.');
        return true; // Sucesso na exclusão

    } catch (error) {
        // Erro inesperado
        console.error('Erro inesperado ao excluir jogador:', error);
        return null;
    }
}
