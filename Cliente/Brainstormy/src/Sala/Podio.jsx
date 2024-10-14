
import React from 'react';
import Conteiner from '../Conteiner';
import './Podio.css';

function Podio({ username, isOwnUser, avatarUrl  }) {
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