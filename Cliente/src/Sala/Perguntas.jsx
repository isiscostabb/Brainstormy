import React, { useState, useEffect } from 'react';
import { tabelaPerguntas } from '../../../Server/Database/tabelaPerguntas.js';
import './Perguntas.css';

function Perguntas({ statusPergunta, roomCode }) {
  const [perguntaData, setPerguntaData] = useState(null); // Estado pergunta
  const [respostasAleatorias, setRespostasAleatorias] = useState([]); // Estado respostas
  const [acertou, setAcertou] = useState(false); // Estado acerto
  const [clique, setClique] = useState(false); // Estado de seleção de resposta
  const [tempoAcabou, setTempoAcabou] = useState(false); // Estado para controlar o fim do tempo
  const [mostrarTempoAcabou, setMostrarTempoAcabou] = useState(true); // Controle da visibilidade da mensagem "tempo acabou"

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
        setTempoAcabou(false); // Resetar o estado de tempo para cada nova pergunta
        setMostrarTempoAcabou(true); // Exibir mensagem "tempo acabou" para nova pergunta
      }
    }
    fetchPergunta();
  }, [statusPergunta, roomCode]);

  // Simula o fim do tempo
  useEffect(() => {
    const timer = setTimeout(() => {
      setTempoAcabou(true); // Define o tempo como acabado
    }, 1000); // Exemplo: define 10 segundos para cada pergunta

    return () => clearTimeout(timer); // Limpa o temporizador se o componente desmontar ou o statusPergunta mudar
  }, [statusPergunta]);

  if (!perguntaData) {
    return <p>Carregando...</p>;
  }

  // Função verificar o clique
  function verificarClique() {
    setClique(true); // Define o estado para verdadeiro, indicando que o usuário clicou
  }

  // Função verificar resposta
  function verificarResposta(resposta) {
    verificarClique(); // Marca que o usuário clicou em uma resposta
    if (resposta === perguntaData.respCorreta) {
      setAcertou(true); // Define o estado de acerto para verdadeiro
    }
  }

  // Função para esconder a mensagem de "tempo acabou"
  function fecharTempoAcabou() {
    setMostrarTempoAcabou(false);
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
              {/*{acertou && <h1>PARABÉNS</h1>}  msg acerto */}
            <h2 className='h2Resultados'>VOCÊ ACERTOU A RESPOSTA E PONTOU X PONTOS</h2>
            <button className='fecharResultados' onClick={fecharTempoAcabou}>Fechar</button>
          </div>

          <div className='midResultados'>
            <h3 className='h3Resultados'>TOTAL DE ACERTOS DOS JOGADORES: X</h3>
            <h3 className='h3Resultados'>CADA <strong>CIDADÃO</strong> RECEBEU X PONTOS</h3>
          </div>

          <div className='midResultados'>
            <h3 className='h3Resultados'>TOTAL DE ERROS DOS JOGADORES: X</h3>
            <h3 className='h3Resultados'>CADA <strong>BOBO</strong> RECEBEU X PONTOS</h3>
          </div>

        </div>
      )}


    </div>
  );
}

export default Perguntas;
