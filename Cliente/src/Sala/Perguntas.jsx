
import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';

import './Perguntas.css';

function Perguntas() {

    const [perguntaData, setPerguntaData] = useState(null); // Estado para armazenar os dados da pergunta
  
    useEffect(() => {
      // Função para buscar os dados da pergunta
      async function fetchPergunta() {
        const data = await tabelaPerguntas(); // Chama a função getData para buscar os dados
        if (data && data.length > 0) {
          setPerguntaData(data[0]); //posição
        }
      }
      fetchPergunta();
    }, []);
  
    if (!perguntaData) {
      return <p>Carregando...</p>; 
    }
  
    return (
      <>
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
      </>
    );
  }
  
  export default Perguntas;