
import React, { useRef, useState, useEffect } from 'react';
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
  const [userList, setUserList] = useState([username]);
  const [statusPergunta, setStatusPergunta] = useState(1);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('newUser', username);
    newSocket.on('recebendoMsg', (data) => setMessageList((current) => [...current, data]));
    newSocket.on('userLeft', (leftUser) => setUserList((currentList) => currentList.filter(user => user !== leftUser)));
    newSocket.on('updateUserList', (userList) => {
      setUserList(userList.map(user => ({ username: user, score: 0 })));
    });
    newSocket.on('statusPerguntaAtualizado', setStatusPergunta);

    return () => {
      newSocket.disconnect();
    };
  }, [username]);

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


