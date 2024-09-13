
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

//Server
import { io } from 'socket.io-client';

import Conteiner from './Componentes/Conteiner';
import './Lobby.css';


function Lobby() {

  //nome usuário
  
  const usernameRef = useRef()
  const navigate = useNavigate();

  const handleSubmit = async() => {
    const username = usernameRef.current.value
    if (!username.trim()) return
    const socket = await io.connect('http://localhost:3001')
    socket.emit('newUser', username) //mandar nome usuário pro Server

    navigate('/Sala', { state: { username } }); //mandar nome usuário pra SALA
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
                <input type="text" className="inputNome" ref={usernameRef} /> {/* nome do usuário */}
              </div>
              <div className="input dois">
                <p className="inputTxt cod">INSIRA O CÓDIGO DA SALA:</p>
                <input type="text" className="inputCod"/>
              </div>
            </div>

            <div className="botoesLobby">
                <Link to="/Sala"> {/* entrar */}
                  <button className="lobby jogar" onClick={()=>{handleSubmit()}}><h2 className='txtButton'>JOGAR AGORA</h2></button>
                </Link>
                <Link to="/Criacao">
                  <button className="lobby criar"><h2 className='txtButton'>CRIAR SUA SALA</h2></button>
                </Link>
            </div>
          </div>
        </Conteiner>
    </>
  );
}

export default Lobby;

