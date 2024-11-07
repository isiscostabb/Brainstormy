
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
  const [erroSala, setErroSala] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const username = usernameRef.current.value.trim();
    const roomCode = roomCodeRef.current.value.trim();

    if (!username || !roomCode) return;

    const salaExiste = await verificarSala(roomCode);
    if (!salaExiste) {
      setErroSala('Sala não encontrada. Verifique o código e tente novamente.');
      return;
    }

    const resultado = await tabelaJogadores(roomCode, username);
    if (resultado) {
      navigate('/Sala', { state: { username, roomCode } });
    } else {
      console.error('Erro ao inserir jogador no banco');
      setErroSala('Erro ao criar jogador. Tente novamente.');
    }
  };

  return (
    <>
      <div className="personagem"> </div>

      <Conteiner largura={'100vw'} altura={'100%'} direcao={'column'}>
        <div className="textoLobby">
          <div className='logotitulo'>
            <img src="../../Logo.png" alt="" />
            <h1 className="h1Lobby">BRAINSTORMY</h1>
          </div>
          <p className="pLobby">Quiz Game</p>
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

            

            <button className="lobby jogar" onClick={handleSubmit}><h2 className='txtButton'>ENTRAR NA SALA</h2></button>
            <Link to="/Login">
              <button className="lobby criar"><h2 className='txtButton'>CRIAR SALA</h2></button>
            </Link>
          </div>
        </div>
      </Conteiner>
    </>
  );
}

export default Lobby;
