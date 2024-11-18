
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
  const [erroSala, setErroSala] = useState(''); //Estado msg erro
  const navigate = useNavigate();  //Hook p/ redirecionar o usuário para outra página

  // Função p/ manipulação dados do formulário
  const handleSubmit = async () => {

    const username = usernameRef.current.value.trim(); //Pegando nome usuário
    const roomCode = roomCodeRef.current.value.trim(); //Pegando código da sala

    if (!username || !roomCode) return; //Se o nome ou o código da sala estiverem vazios, retorna sem fazer nada

    //Verificação se sala existe no banco
    const salaExiste = await verificarSala(roomCode);

    if (!salaExiste) { //Msg de erro se n achar sala
      setErroSala('Sala não encontrada. Verifique o código e tente novamente.');
      return;
    }

    const resultado = await tabelaJogadores(roomCode, username); //Add NOME e COD no banco

    if (resultado) { //Se tiver sucesso em inserir
      navigate('/Sala', { state: { username, roomCode } }); // Navega para a página '/Sala', passando NOME e o COD
    } else { //Se n tiver sucesso
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
            <img src="../../Logo.png" alt="logo" className='logo'/>
            <h1 className="h1Lobby">BRAINSTORMY</h1>
            <img src="../../Logo.png" alt="logo" className='logo'/>

          </div>
          <p className="pLobby">seu jogo de história</p>
        </div>

        <div className="caixaLobby">
          <div className="inputLobby">
            <div className="input um">
              <p className="inputTxt nome">INSIRA SEU NOME:</p>
              <input type="text" className="inputNome" required ref={usernameRef} />
            </div>
            <div className="input dois">
              <p className="inputTxt cod">INSIRA O CÓDIGO DA SALA:</p>
              <input type="number" className="inputCod" ref={roomCodeRef} />
            </div>
          </div>


          <div className="botoesLobby">
            {erroSala && <p className="erroSala">{erroSala}</p>} {/* msg erro */}

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
