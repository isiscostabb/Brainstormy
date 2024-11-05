
import React from 'react';
import Conteiner from '../Conteiner';
import './Podio.css';

function Podio({ username, isOwnUser, score }) {
  return (
    <>
      <Conteiner largura={'100%'} altura={'100px'}>
        <Conteiner largura={'20%'} altura={'100%'}>
          <div className='avatar'></div> 
        </Conteiner>

        <div className='podioMeio'>
          <p className={`nomeUser ${isOwnUser ? 'this' : ''}`}> {username} </p>
          <p className='pontuacao'>pontuação: {score}xp</p>
        </div>

        <Conteiner largura={'30%'} altura={'100%'}>
          <div className='funcao'>
            {isOwnUser && (<p className='pFuncao'>CIDADÃO</p>)}
          </div>
        </Conteiner>
      </Conteiner>
    </>
  );
}

export default Podio;
