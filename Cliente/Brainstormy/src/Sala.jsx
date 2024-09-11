
import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';

import Conteiner from './Componentes/Conteiner';
import Podio from './Componentes/Sala/Podio';
import './Sala.css';

function Sala() {

  const location = useLocation();
  const username = location.state?.username || 'Usuário';

  //----------------------------------------

  const [socket, setSocket] = useState(null);  // Estado para o socket
  const [messageList, setMessageList] = useState([]);
  const [userList, setUserList] = useState([username]);  // Lista de usuários
  const messageRef = useRef();

  useEffect(() => {

    // Criar a conexão socket
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('newUser', username);  //mandar nome usuário SERVER

    // MSG
    newSocket.on('recebendoMsg', (data) => {  
      setMessageList((current) => [...current, data]);
    });

    // NOVOS USUÁRIOS
    newSocket.on('userJoined', (newUser) => {
      setUserList((currentList) => {
        if (!currentList.includes(newUser)) {
          return [...currentList, newUser];  // Adiciona novo usuário se ele não estiver na lista
        }
        return currentList;  // Se o usuário já estiver na lista, retorna a lista atual
      });
    });

    // USUÁRIOS SAÍRAM
    newSocket.on('userLeft', (leftUser) => {
      setUserList((currentList) => currentList.filter(user => user !== leftUser));
    });

    // ATUALIZAR LISTA DE USUÁRIOS
    newSocket.on('updateUserList', (userList) => {
      setUserList(userList);
    });
    
    return () => {
      newSocket.off('recebendoMsg'); // MSG
      newSocket.off('userJoined'); // ENTRAR
      newSocket.off('userLeft'); // USUÁRIOS SAÍRAM
      newSocket.off('updateUserList'); // ATUALIZAR LISTA DE USUÁRIOS
      newSocket.disconnect();  // SAIR
    };
  }, [username]);

  // FUNÇÃO MSG
  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit('newMessage', message); //mandar msg SERVER
    messageRef.current.value = '';  // Limpar o input
  };

  //SAIR
  const handleLeaveRoom = (event) => {
    event.preventDefault();
    console.log("Saindo da sala...");
  };

  return (
    <>
      <Conteiner largura={'100vw'} altura={'100vh'} >
          
          {/* PODIO */}
          <Conteiner largura={'30vw'} altura={'100%'} direcao={'column'}>
            <h1 className='h1Sala'>PÓDIO</h1>

            <div className='podio'>  {/* PODIO DE CADA USER */}
              {userList.map((user, index) => (
                <Podio key={index} username={user} isOwnUser={user === username} />
              ))}  {/* isOwnUser={user === username}, verifica se é o própio usuário */}
            </div>

          </Conteiner >

          <Conteiner largura={'70vw'} altura={'100%'} direcao={'column'}>

            <div className='conteinerTop'>
              <div className='bloco'><p>PERGUNTA 1/10</p></div>
              <div className='bloco'><p>TEMPO RESTANTE 02:00</p></div>
            </div>

            {/* PERGUNTAS */}
            <Conteiner largura={'100%'} altura={'52vh'}>
              <div className='pergunta'></div>
            </Conteiner>


            {/* CHAT */}
            <Conteiner largura={'100%'} altura={'40vh'}>
              <div className='chat'>
                <h2>CHAT PARA DISCUSSÃO</h2>

                <div className='mensagens'>
                  {
                    messageList.map((message, index) => (
                    <p key={index} className='msg'>{message.author}: {message.txt}</p>
                    ))
                  }
                </div>
                <div className='msgBot'>
                  <input type="text" className='inputMensagens' placeholder="Digite sua mensagem" ref={messageRef}/> {/* msg*/}
                  <button className='enviar' onClick={() => handleSubmit()}><p>Enviar</p></button>
                </div>
              </div>
            </Conteiner>

            {/* SAIR */}
            <Link to="/">
                <button type="submit" className='sair' onClick={() => handleLeaveRoom()}><p>Sair da Sala</p></button>
            </Link>

          </Conteiner>
      </Conteiner>
    </>
  );
}

export default Sala;
