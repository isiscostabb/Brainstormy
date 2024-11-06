import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';
import './Perguntas.css';

function Perguntas({ statusPergunta, roomCode }) {
  const [perguntaData, setPerguntaData] = useState(null); // Estado pergunta
  const [respostasAleatorias, setRespostasAleatorias] = useState([]); // Estado respostas
  const [acertou, setAcertou] = useState(false); // Estado acerto
  const [clique, setClique] = useState(false); // Estado de seleção de resposta

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
        
        // Função para embaralhar (Fisher-Yates)
        function embaralhar(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        // Embaralha as respostas
        setRespostasAleatorias(embaralhar(respostas));
        setAcertou(false); // Resetar o estado de acerto para cada rodada
        setClique(false); // Resetar o estado de clique para cada rodada
      }
    }
    fetchPergunta();
  }, [statusPergunta, roomCode]);

  if (!perguntaData) {
    return <p>Carregando...</p>;
  }

  // Função verificar o clique
  function verificarClique() {
    setClique(true); // Define o estado para verdadeiro, indicando que o usuário clicou
    if (setClique == true) {
      h1
    }
  }

  // Função verificar resposp
  function verificarResposta(resposta) {
    verificarClique(); // Marca que o usuário clicou em uma resposta
    if (resposta === perguntaData.respCorreta) {
      setAcertou(true); // Define o estado de acerto para verdadeiro
    }
  }

  return (
    <div className='pergunta'>
      <h2 className='perguntaTxt'>{perguntaData.pergunta}</h2>
      <div className='opcoesResposta'>
        {respostasAleatorias.map((resposta, index) => (
          <div key={index} className='linha'>
            <button className='opcao' onClick={() => verificarResposta(resposta)}>
              <p className='opcaoTxt'>{resposta}</p>
            </button>
          </div>
        ))}
      </div>
      
      {acertou && <h1>PARABÉNS</h1>} {/* msg acerto */}
      {clique &&
      <div className='selecao'>
              <p className='pSelecao'>O resultado aparece somente após o final da rodada</p>  {/* msg após clique */}
      </div>}
    </div>
  );
}

export default Perguntas;
