
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import Conteiner from '../Conteiner';
import './Lobby.css';

function Lobby() {
  const usernameRef = useRef();
  const roomCodeRef = useRef(); 
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    const roomCode = roomCodeRef.current.value; 
    if (!username.trim() || !roomCode) return; // Verifica se ambos os campos foram preenchidos

    const socket = await io.connect('http://localhost:3001');
    socket.emit('newUser', username); // Manda nome do usuário para o Server

    navigate('/Sala', { state: { username, roomCode } }); // Manda código da sala + nome do usuário p/ Sala.jsx
  }

  return (
    <>
      <div className="personagem"> </div>

      <Conteiner largura={'100vw'} altura={'100%'} direcao={'column'}>

        <div className="textoLobby">
          <h1 className="h1Lobby">BRAINSTORMY</h1>
          <p className="pLobby">o seu jogo de história</p>
        </div>

        <div className="caixaLobby">
          <div className="inputLobby">
            <div className="input um">
              <p className="inputTxt nome">INSIRA SEU NOME:</p>
              <input type="text" className="inputNome" ref={usernameRef} />
            </div>
            <div className="input dois">
              <p className="inputTxt cod">INSIRA O CÓDIGO DA SALA:</p>
              <input type="number" className="inputCod" ref={roomCodeRef} />
            </div>
          </div>
          
          <div className="botoesLobby">
            <Link to="/Sala">
              <button className="lobby jogar" onClick={handleSubmit}><h2 className='txtButton'>JOGAR AGORA</h2></button>
            </Link>
            <Link to="/Login">
              <button className="lobby criar"><h2 className='txtButton'>CRIAR SUA SALA</h2></button>
            </Link>
          </div>
        </div>

      </Conteiner>
    </>
  );
}

export default Lobby;