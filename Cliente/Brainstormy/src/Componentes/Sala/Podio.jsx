import React from 'react';
import Conteiner from '../Conteiner';
import './Podio.css';

function Podio({ username, isOwnUser }) {
  return (
    <>
      <Conteiner largura={'100%'} altura={'100px'}>
        <Conteiner largura={'20%'} altura={'100%'}>
          <div className='avatar'></div> {/* avatar */}
        </Conteiner>

        <div className='podioMeio'>
          <p 
            className='nomeUser' 
            style={{ color: isOwnUser ? 'red' : 'black' }} // cor vermelha se for o próprio usuário
          >
            {username}
          </p>
          <p className='pontuacao'>pontuação: 0xp</p> {/* lógica p/ pontos */}
        </div>

        <Conteiner largura={'30%'} altura={'100%'}>
          <div className='funcao'></div> {/* lógica p/ funções */}
        </Conteiner>
      </Conteiner>
    </>
  );
}

export default Podio;
