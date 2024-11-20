// Importa a instância do Supabase de outro módulo para interação com o banco de dados
import { supabase } from './supabase.js';

// Define uma função assíncrona que gerencia a tabela de jogadores
export async function tabelaJogadores(codigoSala, nomeJogador, categoria) {

    try { // Bloco try-catch para capturar e tratar erros durante a execução

        // Verificação se o jogador já existe no banco de dados
        const { data: jogadorExistente, error: erroVerificar } = await supabase
            .from('dados_jogadores') // Especifica a tabela 'dados_jogadores'
            .select('id_jogador') // Seleciona o campo 'id_jogador'
            .eq('nome', nomeJogador) // Filtra pela coluna 'nome' que deve ser igual ao 'nomeJogador'
            .single(); // Espera um único registro como resposta

        // Se houver erro ao verificar, mas não for erro de 'jogador não encontrado' (PGRST116)
        if (erroVerificar && erroVerificar.code !== 'PGRST116') { 
            console.error('Erro ao verificar jogador existente:', erroVerificar); // Exibe erro no console
            return null; // Retorna null em caso de erro
        }

        // Se jogador já existe no banco
        if (jogadorExistente) {
            console.log('Jogador já existe:', jogadorExistente); // Exibe dados do jogador existente no console
            return jogadorExistente; // Retorna os dados do jogador encontrado
        } 

        // Caso o jogador não exista no banco, cria um novo registro
        else { 
            // Insere um novo jogador na tabela 'jogadores' com o código da sala
            const { data: novoJogador, error: erroInserirJogador } = await supabase
                .from('jogadores') // Especifica a tabela 'jogadores'
                .insert([{ codigo_sala: codigoSala }]) // Insere um novo jogador com o código da sala
                .select('id_jogador') // Seleciona o 'id_jogador' do jogador recém-inserido
                .single(); // Espera um único registro como resposta

            // Se ocorrer erro ao tentar inserir o novo jogador
            if (erroInserirJogador) {
                console.error('Erro ao criar jogador:', erroInserirJogador); // Exibe o erro no console
                return null; // Retorna null caso haja erro
            }

            // Insere os dados adicionais do jogador (nome, pontuação, função)
            const { data: dadosJogador, error: erroInserirDados } = await supabase
                .from('dados_jogadores') // Especifica a tabela 'dados_jogadores'
                .insert([{ 
                    nome: nomeJogador, // Nome do jogador
                    pontuacao: 0, // Pontuação inicial do jogador
                    id_jogador: novoJogador.id_jogador, // Relaciona o 'id_jogador' com o jogador inserido
                    funcao: categoria // Função ou categoria do jogador
                }])
                .select('nome, pontuacao, funcao, id_jogador') // Seleciona os dados inseridos
                .single(); // Espera um único registro como resposta

            // Se houver erro ao inserir os dados do jogador
            if (erroInserirDados) {
                console.error('Erro ao inserir dados do jogador:', erroInserirDados); // Exibe erro no console
                return null; // Retorna null em caso de erro
            }

            console.log('Jogador inserido com sucesso:', dadosJogador); // Exibe os dados do novo jogador inserido
            return dadosJogador; // Retorna os dados do jogador recém-criado
        }
    } catch (error) {
        // Captura qualquer erro inesperado
        console.error('Erro inesperado:', error); // Exibe o erro no console
        return null; // Retorna null em caso de erro inesperado
    }
}
