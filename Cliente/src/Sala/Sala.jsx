
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

  //----------------------------------------

  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([username]);

  useEffect(() => {

    // Criar a conexão socket
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('newUser', username); //mandar nome usuário SERVER

    // MSG
    newSocket.on('recebendoMsg', (data) => {  
      setMessageList((current) => [...current, data]);
    });

    // USUÁRIOS SAÍRAM
    newSocket.on('userLeft', (leftUser) => {
      setUserList((currentList) => currentList.filter(user => user !== leftUser));
    });

    // ATUALIZAR LISTA DE USUÁRIOS
    newSocket.on('updateUserList', (userList) => {
      setUserList(userList.map(user => ({ username: user, avatarUrl: `https://picsum.photos/seed/${user}/50` })));
    });

    return () => {
      newSocket.off('recebendoMsg'); // MSG
      newSocket.off('userLeft'); // USUÁRIOS SAÍRAM
      newSocket.off('updateUserList'); // ATUALIZAR LISTA DE USUÁRIOS
      newSocket.disconnect(); // SAIR
    };
  }, [username]);

  // FUNÇÃO MSG
  const handleSubmit = (message) => {
    if (!message.trim()) return;
    socket.emit('newMessage', message); //mandar msg SERVER
  };

  return (
    <>
      <Conteiner largura={'100vw'} altura={'100vh'}>
          
        {/* PODIO */}
        <Conteiner largura={'30vw'} altura={'100%'} direcao={'column'}>
          <h1 className='h1Sala'>PÓDIO</h1>
          <div className='podio'>
            {userList.map((user, index) => (
              <Podio key={index} username={user.username} avatarUrl={user.avatarUrl} isOwnUser={user.username === username} />
            ))}
          </div>
        </Conteiner >

        {/* LADO DIREITO */}
        <Conteiner largura={'70vw'} altura={'100%'} direcao={'column'}>

          <Temporizador/>

          {/* PERGUNTAS */}
          <Conteiner largura={'100%'} altura={'52vh'}>
            <Perguntas/>
          </Conteiner>

          {/* CHAT */}
          <Conteiner largura={'100%'} altura={'40vh'}>
            <Chat
              messageList={messageList}
              username={username}
              handleSubmit={handleSubmit}
            />
          </Conteiner>

          {/* SAIR */}
          <Link to="/">
            <button type="submit" className='sair' onClick={() => handleLeaveRoom()}>
              <p>Sair da Sala</p>
            </button>
          </Link>

        </Conteiner>
      </Conteiner>
    </>
  );
}

export default Sala;