
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

import { tabelaJogadores } from '../../../Server/Database/tabelaJogadores';
import { excluirJogador } from '../../../Server/Database/excluirJogador'; 
import Conteiner from '../Conteiner';
import Podio from './Podio';
import Temporizador from './Temporizador';
import Chat from './Chat'; 
import Perguntas from './Perguntas';
import './Sala.css';

function Sala() {

  const location = useLocation();
  const username = location.state?.username || 'Usuário';
  const roomCode = location.state?.roomCode;

  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([{ username, category: '' }]);
  const [statusPergunta, setStatusPergunta] = useState(1);
  const [jogadores, setJogadores] = useState([]); // Estado para armazenar os dados dos jogadores
  const navigate = useNavigate(); 

  // Estabelece a conexão com o servidor
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Envia servidor usuário
    newSocket.emit('newUser', username);

    // Ouvinte msg
    newSocket.on('recebendoMsg', (data) => setMessageList((current) => [...current, data]));

    // Ouvinte sair da sala (remove da lista de usuários)
    newSocket.on('userLeft', (leftUser) => 
      setUserList((currentList) => currentList.filter(user => user.username !== leftUser)) // Atribui as categorias cada rodada
    );

    // Ouvinte para atualizar a lista de jogadores
    newSocket.on('updateUserList', (users) => {
      const updatedUsers = users.map(user => ({ username: user, category: 'teste2' })); 
      setUserList(assignCategories(updatedUsers)); // Atribui as categorias a cada rodada
    });

    // Ouvinte quando status da pergunta muda
    newSocket.on('statusPerguntaAtualizado', setStatusPergunta);

    // Ouvinte fim jogo
    newSocket.on('jogoFinalizado', () => {

      const updatedPodio = jogadores.map(({ nome, pontuacao }) => ({
        username: nome,
        pontuacao,
      }));

      // Redireciona para a página de Ranking
      navigate('/Ranking', { state: { updatedPodio } });
    });

    // Função de limpeza para desconectar o socket quando o componente for desmontado
    return () => {
      newSocket.disconnect();
    };
  }, [username, navigate, jogadores]);

  // Atualiza MSG e JOGADORES sempre que o status da pergunta mudar
  useEffect(() => {
    setMessageList([]); // Limpa msg
    setUserList(prevUserList => assignCategories(prevUserList)); // Atribui as categorias novamente aos jogadores(atualizar no banco tbm)
  }, [statusPergunta]); //O useEffect depende de 'statusPergunta'

  // Função BOBO e CIDADÃO
  const assignCategories = (players) => {
    const numBobo = Math.floor(players.length * 0.15); // Calculo do 15%
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random()); // Embaralha lista de jogador
    const updatedPlayers = shuffledPlayers.map((player, index) => ({
      ...player,
      category: index < numBobo ? 'BOBO' : 'CIDADÃO', // Atribui 'BOBO' ou 'CIDADÃO' com base na posição do jogador
    }));

    // Envia as categorias e atualiza a pontuação na tabelaJogadores
    updatedPlayers.forEach((player) => {
      tabelaJogadores(roomCode, player.username, player.category);  // Atualizando tabelaJogadores
      // Envia para o servidor
      if (socket && socket.connected) {
        socket.emit('updateCategory', { username: player.username, category: player.category });
      }
    });

    return updatedPlayers;
  };

  // Função para pegar os dados dos jogadores ao entrar na sala
  const fetchJogadoresData = async () => {
    const jogadoresData = [];
    for (const user of userList) {
      const jogador = await tabelaJogadores(roomCode, user.username, user.category, user.score);
      if (jogador) {
        jogadoresData.push(jogador);
      }
    }
    setJogadores(jogadoresData);  // Atualiza o estado com os dados dos jogadores
  };

  useEffect(() => {
    if (roomCode) {
      fetchJogadoresData();  // Busca os dados dos jogadores quando a sala é acessada
    }
  }, [userList, roomCode]);

  // Função chamada quando a mensagem é enviada
  const handleSubmit = async (message) => {
    if (message.trim() && socket && socket.connected) {
      socket.emit('newMessage', message);
    } else {
      console.warn('Socket não está conectado ou disponível para enviar mensagem.');
    }
  };

  // Função que é chamada quando usuário sai
  const handleLeaveRoom = async () => {
    if (socket && socket.connected) {
      socket.emit('leaveRoom', username);
      
      // Chama a função para excluir os dados do jogador ao sair
      const success = await excluirJogador(username);
      if (success) {
        console.log(`Dados do jogador ${username} excluídos com sucesso.`);
      } else {
        console.warn('Erro ao excluir os dados do jogador.');
      }

      socket.disconnect(); // Desconecta no servidor
    } else {
      console.warn('Socket não está conectado ou disponível para sair da sala.');
    }
  };

  return (
    <Conteiner largura={'100vw'} altura={'100vh'}>
      <Conteiner largura={'30vw'} altura={'100%'} direcao={'column'}>
        <h1 className='h1Sala'>PÓDIO</h1>
        <div className='podio'>
          {jogadores.map((jogador, index) => (
            <Podio 
              key={index} 
              username={jogador.nome} 
              score={jogador.pontuacao} 
              isOwnUser={jogador.nome === username} 
              category={jogador.category}
            />
          ))}
        </div>
      </Conteiner>

      <Conteiner largura={'70vw'} altura={'100%'} direcao={'column'}>
        <Temporizador onStatusPerguntaChange={setStatusPergunta} />
        <Conteiner largura={'100%'} altura={'52vh'}>
          {jogadores.map((jogador, index) => (
            <Perguntas 
              key={index} 
              username={jogador.nome} 
              score={jogador.pontuacao} 
              isOwnUser={jogador.nome === username} 
              category={jogador.category}
              statusPergunta={statusPergunta}
              roomCode={roomCode}
            />
          ))}
        </Conteiner>
        <Conteiner largura={'100%'} altura={'40vh'}>
          <Chat
            messageList={messageList}
            username={username}
            handleSubmit={handleSubmit}
          />
        </Conteiner>
        <Link to="/">
          <button type="submit" className='sair' onClick={handleLeaveRoom}>
            <p>Sair da Sala</p>
          </button>
        </Link>
      </Conteiner>
    </Conteiner>
  );
}

export default Sala;
