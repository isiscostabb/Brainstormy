
import { supabase } from './supabase.js';

export async function tabelaJogadores(codigoSala, nomeJogador, categoria) {

    const { data: jogadorData, error: jogadorError } = await supabase //nome jogador + gerar id 
        .from('jogadores')
        .insert([{ codigo_sala: codigoSala }])
        .select('id_jogador')
        .single();

    if (jogadorError) {
        console.error('Erro ao criar jogador:', jogadorError);
        return null;
    }

    const idJogador = jogadorData.id_jogador;

    const { data: dadosJogador, error: dadosError } = await supabase  // nome do jogador + pontuação inicial + a categoria (funcao)
        .from('dados_jogadores')
        .insert([{ nome: nomeJogador, pontuacao: 0, id_jogador: idJogador, funcao: categoria }])
        .select('nome, pontuacao, funcao') 
        .single();

    if (dadosError) {
        console.error('Erro ao inserir dados do jogador:', dadosError);
        return null;
    }

    return dadosJogador;
}