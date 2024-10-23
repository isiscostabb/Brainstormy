import { supabase } from './supabase.js';

export async function tabelaJogadores(codigoSala, nomeJogador) {
    // Inserir o nome do usuário na tabela jogadores e gerar um ID
    const { data: jogadorData, error: jogadorError } = await supabase
        .from('jogadores')
        .insert([{ codigo_sala: codigoSala }])
        .select('id_jogador')
        .single();

    if (jogadorError) {
        console.error('Erro ao criar jogador:', jogadorError);
        return null;
    }

    const idJogador = jogadorData.id_jogador;

    // Inserir o nome do jogador e pontuação inicial na tabela dados_jogadores
    const { data: dadosJogador, error: dadosError } = await supabase
        .from('dados_jogadores')
        .insert([{ nome: nomeJogador, pontuacao: 0, id_jogador: idJogador }])
        .select('nome, pontuacao')
        .single();

    if (dadosError) {
        console.error('Erro ao inserir dados do jogador:', dadosError);
        return null;
    }

    // Retornar nome e pontuação do jogador
    return dadosJogador;
}