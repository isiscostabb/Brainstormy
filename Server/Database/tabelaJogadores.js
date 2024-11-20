
import { supabase } from './supabase.js';

export async function tabelaJogadores(codigoSala, nomeJogador, categoria) {

    try { 

        // Verificação existencia jogador
        const { data: jogadorExistente, error: erroVerificar } = await supabase
            .from('dados_jogadores')
            .select('id_jogador')
            .eq('nome', nomeJogador)
            .single();

        // Caso tenha erro
        if (erroVerificar && erroVerificar.code !== 'PGRST116') { 
            console.error('Erro ao verificar jogador existente:', erroVerificar);
            return null;
        }

        // Se jogador já existe
        if (jogadorExistente) {
            console.log('Jogador já existe:', jogadorExistente); // Exibe dados do jogador existente no console
            return jogadorExistente; // Retorna os dados do jogador (ID)
        } 

        // Quando jogador n existe (cria) TABELA 1
        else { 
            const { data: novoJogador, error: erroInserirJogador } = await supabase
                .from('jogadores') 
                .insert([{ codigo_sala: codigoSala }]) 
                .select('id_jogador')
                .single();

            // Caso tenha erro
            if (erroInserirJogador) {
                console.error('Erro ao criar jogador:', erroInserirJogador);
                return null;
            }

            // Inserção dados adicionais (nome, pontuação, função) TABELA 2
            const { data: dadosJogador, error: erroInserirDados } = await supabase
                .from('dados_jogadores')
                .insert([{ 
                    nome: nomeJogador,
                    pontuacao: 0,
                    id_jogador: novoJogador.id_jogador, // Relaciona o 'id_jogador' com o jogador inserido
                    funcao: categoria
                }])
                .select('nome, pontuacao, funcao, id_jogador') 
                .single();

            // Caso tenha erro
            if (erroInserirDados) {
                console.error('Erro ao inserir dados do jogador:', erroInserirDados);
                return null;
            }

            // Sucesso
            console.log('Jogador inserido com sucesso:', dadosJogador); // Exibe os dados do novo jogador inserido
            return dadosJogador; // Retorna os dados do jogador recém-criado (NOME, PONTUAÇÃO, FUNCAO E ID)
        }
    } catch (error) {
        console.error('Erro inesperado:', error);
        return null;
    }
}
