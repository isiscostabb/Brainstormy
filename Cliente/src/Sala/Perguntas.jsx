
import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';
import './Perguntas.css';

function Perguntas({ statusPergunta, roomCode }) { 
  
  const [perguntaData, setPerguntaData] = useState(null);
  const [respostasAleatorias, setRespostasAleatorias] = useState([]);

  useEffect(() => {
    async function fetchPergunta() {
      const data = await tabelaPerguntas(roomCode);
      if (data && data.length > 0) {
        const pergunta = data[statusPergunta - 1];
        setPerguntaData(pergunta);
        
        // Array respostas
        const respostas = [
          pergunta.respCorreta,
          pergunta.respIncorreta1,
          pergunta.respIncorreta2,
          pergunta.respIncorreta3
        ];
        
        // Embaralhar (Fisher-Yates)
        function embaralhar(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        // Embaralha as respostas e define o estado
        setRespostasAleatorias(embaralhar(respostas));
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
        {respostasAleatorias.map((resposta, index) => (
          <div key={index} className='linha'>
            <button className='opcao'>
              <p className='opcaoTxt'>{resposta}</p> 
            </button>
          </div>
        ))}
      </div>
      <p>O resultado aparece somente após o final da rodada</p>
    </div>
  );
}

export default Perguntas;
