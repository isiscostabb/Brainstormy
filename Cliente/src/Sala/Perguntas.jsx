
import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';
import { atualizarRodada } from '../../../Server/Database/atualizarRodada.js';

import './Perguntas.css';

function Perguntas({ username, isOwnUser, score, category, statusPergunta, roomCode }) {
  
  const [perguntaData, setPerguntaData] = useState(null); // Estado pergunta
  const [respostasAleatorias, setRespostasAleatorias] = useState([]); // Estado respostas
  const [acertou, setAcertou] = useState(false); // Estado acerto
  const [errou, setErrou] = useState(false); // Estado erro
  const [clique, setClique] = useState(false); // Estado de seleção de resposta
  const [tempoAcabou, setTempoAcabou] = useState(false); // Estado para controlar o fim do tempo
  const [mostrarTempoAcabou, setMostrarTempoAcabou] = useState(true); // Mostar resultados

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

        // Embaralhar respostas (Fisher-Yates)
        function embaralhar(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        }

        setRespostasAleatorias(embaralhar(respostas)); // Embaralha as respostas
        setClique(false); // Resetar o estado de clique para cada rodada
        setMostrarTempoAcabou(true); // Mostrar os reusltados da rodada
        setTempoAcabou(false); // Resetar o estado de tempo para cada nova pergunta
      }
    }
    fetchPergunta();
  }, [statusPergunta, roomCode]);

  // Fim do tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setTempoAcabou(true); // Define o tempo como acabado
    }, 1000);

    return () => clearTimeout(timer); // Limpa o temporizador qunado statusPergunta mudar
  }, [statusPergunta]);

  if (!perguntaData) {
    return <p>Carregando...</p>;
  }

  // Após o clique bloqueia as respostas
  function verificarClique() {
    setClique(true);
  }

  // Verificar resposta
  function verificarResposta(resposta) {
    verificarClique(); // Chama função quando clica
    if (resposta === perguntaData.respCorreta) {
      setAcertou(true); // Evento para quando acerta
      score += 10; // LOGICA PONTOS POR CATEGORIA
      atualizarRodada(roomCode, username, score, category);
    } else {
      setErrou(true); // Evento para quando erra
    }
  }

  // Resultados quando acaba tempo
  function fecharTempoAcabou() {
    setMostrarTempoAcabou(false);
    setErrou(false); // Resetar o estado de erro para cada rodada
    setAcertou(false); // Resetar o estado de acerto para cada rodada
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
      
      {/* Quando clica em uma resp */}
      {clique && (
        <div className='selecao'>
          <p className='pSelecao'>O resultado aparece somente após o final da rodada</p>
        </div>
      )}

      {/* Quando tempo acaba */}
      {tempoAcabou && mostrarTempoAcabou && (
        <div className='resultados'>

          <div className='topResultados'>
            <h1 className='h1Resultados'>RESULTADOS DA RODADA</h1>
            
            <h2 className='h2Resultados'>
            VOCÊ {acertou ? 'ACERTOU A RESPOSTA' : errou ? 'ERROU A RESPOSTA' : 'NÃO RESPONDEU'} E TEM {isOwnUser && <h2>{score}</h2>} PONTOS
            </h2>
            <button className='fecharResultados' onClick={fecharTempoAcabou}>Fechar</button>
          </div>

          <div className='midResultados'>
            <h3 className='h3Resultados'>QUANTIDADE DE ACERTOS: X</h3>
            <h3 className='h3Resultados'>CADA <strong>CIDADÃO</strong> RECEBEU X PONTOS</h3>
          </div>

          <div className='midResultados'>
            <h3 className='h3Resultados'>QUANTIDADE DE ERROS: X</h3>
            <h3 className='h3Resultados'>CADA <strong>BOBO</strong> RECEBEU X PONTOS</h3>
          </div>

        </div>
      )}
    </div>
  );
}

export default Perguntas;