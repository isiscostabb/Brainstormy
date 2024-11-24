
import { FaUserAlt } from "react-icons/fa";

import React from 'react';
import Conteiner from '../Conteiner';
import './Podio.css';

function Podio({ username, isOwnUser, score, category }) {
  return (
    <>
        <Conteiner className='podio' largura={'100%'} altura={'100px'}>
          <Conteiner largura={'20%'} altura={'100px'}>
            <div className='avatar'>
              <FaUserAlt size={30} color="white"/>
            </div>
          </Conteiner>
          <div className='podioMeio'>
            <p className={`nomeUser ${isOwnUser ? 'this' : ''}`}> {username} </p>
            <p className='pontuacao'>pontuação: {isOwnUser && `${score} xp`}</p>
          </div>
          <Conteiner largura={'30%'} altura={'100%'}>
            <div className='funcao'>
              {/*{isOwnUser && (<p className='pFuncao'>{category}</p>)} */}
              <p className='pFuncao'>cidadao</p>
            </div>
          </Conteiner>
        </Conteiner>
    </>
  );
}

export default Podio;