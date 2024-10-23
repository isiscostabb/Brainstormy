
import React from 'react';
import Conteiner from '../Conteiner';
import './Podio.css';

function Podio({ username, isOwnUser, avatarUrl, score }) { // Adicionando a prop score
  return (
    <>
      <Conteiner largura={'100%'} altura={'100px'}>
        <Conteiner largura={'20%'} altura={'100%'}>
          <div className='avatar'>
            <img src={avatarUrl} alt="avatar" className="avatarImg" /> {/* avatar */}
          </div> 
        </Conteiner>

        <div className='podioMeio'>
          <p className={`nomeUser ${isOwnUser ? 'this' : ''}`}> {username} </p>
          <p className='pontuacao'>pontuação: {score}xp</p> {/* Atualizando a lógica para mostrar a pontuação */}
        </div>

        <Conteiner largura={'30%'} altura={'100%'}>
          <div className='funcao'>
            <p className='pFuncao'>CIDADÃO</p>  {/* ao clicar aparecer um texto explicando as 2 funções */}
          </div> {/* lógica para funções */}
        </Conteiner>
      </Conteiner>
    </>
  );
}

export default Podio;
