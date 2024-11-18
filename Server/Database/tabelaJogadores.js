
import { supabase } from './supabase.js';

export async function tabelaJogadores(codigoSala, nomeJogador, categoria) {

    // Inserir o novo jogador e pegar o id_jogador gerado
    const { data: jogadorData, error: jogadorError } = await supabase
        .from('jogadores')
        .insert([{ codigo_sala: codigoSala }])
        .select('id_jogador')
        .single();

    if (jogadorError) {
        console.error('Erro ao criar jogador:', jogadorError);
        return null;
    }

    // Pegar o ID do jogador inserido
    const idJogador = jogadorData.id_jogador;

    // Agora, inserindo os dados do jogador na tabela dados_jogadores
    const { data: dadosJogador, error: dadosError } = await supabase
        .from('dados_jogadores')
        .insert([{ nome: nomeJogador, pontuacao: 0, id_jogador: idJogador, funcao: categoria }])
        .select('nome, pontuacao, funcao, id_jogador') // Aqui estamos selecionando o ID também, caso queira retornar ele
        .single();

    if (dadosError) {
        console.error('Erro ao inserir dados do jogador:', dadosError);
        return null;
    }

    // Retorna os dados completos do jogador (incluindo ID do jogador)
    return dadosJogador;
}
