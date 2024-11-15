
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

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
  const [userList, setUserList] = useState([{ username, score: 0, category: 'CIDADÃO' }]);
  const [statusPergunta, setStatusPergunta] = useState(1);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('newUser', username);
    newSocket.on('recebendoMsg', (data) => setMessageList((current) => [...current, data]));
    newSocket.on('userLeft', (leftUser) => 
      setUserList((currentList) => currentList.filter(user => user.username !== leftUser))
    );
    newSocket.on('updateUserList', (users) => {
      const updatedUsers = users.map(user => ({ username: user, score: 0 }));
      setUserList(assignCategories(updatedUsers));  // Atribui as categorias a cada rodada
    });
    newSocket.on('statusPerguntaAtualizado', setStatusPergunta);

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

  // Limpar chat + atualiza categorias a cada rodada
  useEffect(() => {
    setMessageList([]);
    setUserList(prevUserList => assignCategories(prevUserList));
  }, [statusPergunta]);

  // Atribuir categorias
  const assignCategories = (players) => {
    const numBobo = Math.floor(players.length * 0.15);
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    const updatedPlayers = shuffledPlayers.map((player, index) => ({
      ...player,
      category: index < numBobo ? 'BOBO' : 'CIDADÃO',
    }));
    return updatedPlayers;
  };

  const handleSubmit = (message) => {
    if (message.trim()) {
      socket.emit('newMessage', message);
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom', username);
    socket.disconnect();
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
