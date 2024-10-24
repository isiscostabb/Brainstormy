import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { tabelaJogadores } from '../../../Server/Database/tabelaJogadores';
import { verificarSala } from '../../../Server/Database/verificarSala';
import Conteiner from '../Conteiner';

import './Lobby.css';

function Lobby() {
  const usernameRef = useRef();
  const roomCodeRef = useRef();
  const [erroSala, setErroSala] = useState(''); // Estado para armazenar a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const username = usernameRef.current.value;
    const roomCode = roomCodeRef.current.value;

    if (!username.trim() || !roomCode) return; // Verifica se ambos os campos foram preenchidos

    // Verifica se a sala existe
    const salaExiste = await verificarSala(roomCode);
    if (!salaExiste) {
      setErroSala('Sala não encontrada. Verifique o código e tente novamente.');
      return; // Impede a navegação se a sala não existir
    }

    // Conecta ao WebSocket
    const socket = await io.connect('http://localhost:3001');
    socket.emit('newUser', username); // Manda nome do usuário para o Server

    // Chama a função que insere o jogador no banco de dados
    const resultado = await tabelaJogadores(roomCode, username);
    if (resultado) {
      console.log('Jogador inserido no banco:', resultado);
    } else {
      console.error('Erro ao inserir jogador no banco');
      return;
    }

    // Navega para a sala com os dados
    navigate('/Sala', { state: { username, roomCode } }); // Manda código da sala + nome do usuário p/ Sala.jsx
  };

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
            {erroSala && <p className="erroSala">{erroSala}</p>} {/* Exibe a mensagem de erro, se houver */}

            

            <button className="lobby jogar" onClick={handleSubmit}><h2 className='txtButton'>JOGAR AGORA</h2></button>
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
