import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

import { useParams } from 'react-router-dom';
import { insercaoJogadores } from '../../../Server/Database/insercaoJogadores';
import { insercaoFuncao } from '../../../Server/Database/insercaoFuncao';import Conteiner from '../Conteiner';
import Podio from './Podio';
import Temporizador from './Temporizador';
import Chat from './Chat'; 
import Perguntas from './Perguntas';
import './Sala.css';

function Sala() {
  // Pegando dados do formulário do Lobby
  const location = useLocation();   // Pegar dados passados pela navegação do Lobby
  const username = location.state?.username || 'Usuário'; // NOME jogador
  const roomCode = location.state?.roomCode; // CÓDIGO sala

  const [socket, setSocket] = useState(null); // Conexão
  const [messageList, setMessageList] = useState([]); // Msg
  const [userList, setUserList] = useState([{ username, score: 0, category: '' }]); // Lista de jogadores, categorias e pontuação
  const [statusPergunta, setStatusPergunta] = useState(1); // Status pergunta

  // Estabelece a conexão e configura os ouvintes de eventos quando o componente for montado
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Envia servidor usuário
    newSocket.emit('newUser', username);

    // Ouvinte msg
    newSocket.on('recebendoMsg', (data) => setMessageList((current) => [...current, data]));
    
    // Ouvinte sair da sala (remove da lista de usuários)
    newSocket.on('userLeft', (leftUser) => 
      setUserList((currentList) => currentList.filter(user => user.username !== leftUser))
    );

    // Ouvinte atualizar lista jogadores
    newSocket.on('updateUserList', (users) => {
      const updatedUsers = users.map(user => ({ username: user, score: 0 }));
      setUserList(assignCategories(updatedUsers)); // Atribui as categorias a cada rodada
    });

    // Ouvinte quando status da pergunta muda
    newSocket.on('statusPerguntaAtualizado', setStatusPergunta);

    // Função de limpeza para desconectar o socket quando o componente for desmontado
    return () => {
      newSocket.disconnect();
    };

  }, [username]);

  // Atualiza MSG e JOGADORES sempre que o status da pergunta mudar
  useEffect(() => {
    const updatePlayers = async () => {
      setMessageList([]); // Limpa msg
      const updatedUserList = await assignCategories(userList);
      setUserList(updatedUserList); // Atualiza a lista de usuários com categorias atribuídas
    };

    updatePlayers();
  }, [statusPergunta]);

  // Função BOBO e CIDADÃO
  const assignCategories = async (players) => {
    const numBobo = Math.floor(players.length * 0.15); // Calculo do 15%
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random()); // Embaralha lista de jogador
    const updatedPlayers = await Promise.all(
      shuffledPlayers.map(async (player, index) => {
        const category = index < numBobo ? 'BOBO' : 'CIDADÃO'; // Define categoria
        const result = await tabelaJogadores(roomCode, player.username, category); // Espera o retorno do ID do jogador
        const idJogador = result?.id_jogador;

        // Aqui você pode fazer outra atualização no banco, se necessário, usando idJogador
        if (idJogador) {
          console.log(`Jogador ${player.username} recebeu ID ${idJogador}`);
        } else {
          console.warn(`Falha ao atribuir ID para ${player.username}`);
        }

        return { ...player, category }; // Retorna o jogador atualizado com a categoria
      })
    );

    // Envia para o servidor
    updatedPlayers.forEach((player) => {
      if (socket && socket.connected) {
        socket.emit('updateCategory', { username: player.username, category: player.category, roomCode });
      }
    });

    return updatedPlayers; // Retorna a lista atualizada de jogadores com suas categorias
  };

  // Função q é chamada quando msg é enviada
  const handleSubmit = async (message) => {
    if (message.trim() && socket && socket.connected) {
      socket.emit('newMessage', message); // Manda pro servidor
    } else {
      console.warn('Socket não está conectado ou disponível para enviar mensagem.');
    }
  };

  // Função que é chamada quando usuário sai
  const handleLeaveRoom = () => {
    if (socket && socket.connected) {
      socket.emit('leaveRoom', username);
      socket.disconnect(); // Desconecta no servidor
    } else {
      console.warn('Socket não está conectado ou disponível para sair da sala.');
    }
  };

  return (
    <>
      <Conteiner largura={'100vw'} altura={'100vh'}>
        <Conteiner largura={'30vw'} altura={'100%'} direcao={'column'}>
          <h1 className='h1Sala'>PÓDIO</h1>
          <div className='podio'>
            {userList.map((user, index) => (
              <Podio 
                key={index} 
                username={user.username} 
                score={user.score} 
                isOwnUser={user.username === username} 
                category={user.category}
              />
            ))}
          </div>
        </Conteiner>

        <Conteiner largura={'70vw'} altura={'100%'} direcao={'column'}>
          <Temporizador onStatusPerguntaChange={setStatusPergunta} />
          <Conteiner largura={'100%'} altura={'52vh'}>
            <Perguntas statusPergunta={statusPergunta} roomCode={roomCode} />
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
    </>
  );
}

export default Sala;
