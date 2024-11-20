
import { supabase } from './supabase.js';

export async function excluirJogador(nomeJogador) {

    //Verificação existencia jogador
    try {
        const { data: jogadorExistente, error: erroVerificar } = await supabase
            .from('dados_jogadores')
            .select('id_jogador')
            .eq('nome', nomeJogador)
            .single();

        // Se n encontrar
        if (erroVerificar) {
            console.error('Erro ao verificar jogador:', erroVerificar);
            return null;
        }

        if (!jogadorExistente) {
            console.log('Jogador não encontrado.');
            return null; 
        }

        // Quando encontrar
        // Exclusão tabela 1
        const { error: erroExcluir } = await supabase
            .from('dados_jogadores')
            .delete()
            .eq('id_jogador', jogadorExistente.id_jogador);

        // Caso acontença erro
        if (erroExcluir) {
            console.error('Erro ao excluir na tabela "dados_jogadores":', erroExcluir);
            return null;
        }

        // Exclusão tabela 2
        const { error: erroExcluirJogador } = await supabase
            .from('jogadores')
            .delete()
            .eq('id_jogador', jogadorExistente.id_jogador);

        // Caso acontença erro
        if (erroExcluirJogador) {
            console.error('Erro ao excluir jogador na tabela "jogadores":', erroExcluirJogador);
            return null;
        }

        // Sucesso
        console.log('Jogador excluído com sucesso nas 2 tabelas.');
        return true; // Sucesso na exclusão

    } catch (error) {
        // Erro inesperado
        console.error('Erro inesperado ao excluir jogador:', error);
        return null;
    }
}