
import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';
import './Perguntas.css';

function Perguntas({ statusPergunta, roomCode }) {  
  const [perguntaData, setPerguntaData] = useState(null);

  useEffect(() => {
    async function fetchPergunta() {
      const data = await tabelaPerguntas(roomCode);
      if (data && data.length > 0) {
        setPerguntaData(data[statusPergunta - 1]);
      }
    }
    fetchPergunta();
  }, [statusPergunta, roomCode]); // Atualiza quando statusPergunta ou roomCode muda

  if (!perguntaData) {
    return <p>Carregando...</p>;
  }

  return (
    <div className='pergunta'>
      <h2 className='perguntaTxt'>{perguntaData.pergunta}</h2>
      <div className='opcoesResposta'>
        <div className='linha'>
          <div className='opcao'>
            <p className='opcaoTxt'>{perguntaData.respCorreta}</p> 
          </div>
          <div className='opcao'>
            <p className='opcaoTxt'>{perguntaData.respIncorreta1}</p>
          </div>
        </div>
        <div className='linha'>
          <div className='opcao'>
            <p className='opcaoTxt'>{perguntaData.respIncorreta2}</p>
          </div>
          <div className='opcao'>
            <p className='opcaoTxt'>{perguntaData.respIncorreta3}</p>
          </div>
        </div>
      </div>
      <p>O resultado aparece somente após o final da rodada</p>
    </div>
  );
}

export default Perguntas;
