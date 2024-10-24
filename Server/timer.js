
let perguntaStatus = 1;
let temporizadorAtivo = false;
let tempoTotal = 120;
let tempoInicial; // Armazenar o horário de entrada do primeiro jogador


// Calcular tempo restante
const calcularTempoRestante = () => {
  const agora = new Date().getTime(); // Pega o horário atual
  const tempoDecorrido = Math.floor((agora - tempoInicial) / 1000);
  const tempoRestante = tempoTotal - tempoDecorrido;
  return tempoRestante >= 0 ? tempoRestante : 0; // Retorna o tempo restante ou 0 se o tempo acabou
};

// Atualizar o temporizador
const atualizarTemporizador = (io) => {
  
  const tempoRestante = calcularTempoRestante();
  
  if (tempoRestante > 0) {
    io.emit('tempoAtualizado', tempoRestante); // Manda atualização do tempo
  } else {

    // Atualiza o status da pergunta
    perguntaStatus += 1;

    //Quando acabar
    if (perguntaStatus > 10) {
      perguntaStatus = 1; // Reinicia o status da pergunta
    }
    io.emit('statusPerguntaAtualizado', perguntaStatus); // Envia a atualização do status da pergunta para todos os clientes

    // Reinicia o temporizador
    tempoInicial = new Date().getTime();
  }
};

// Iniciar o temporizador
const iniciarTemporizador = (io) => {

  if (temporizadorAtivo) return; // Evita iniciar múltiplos temporizadores

  temporizadorAtivo = true;
  tempoInicial = new Date().getTime(); // Captura o horário de entrada do primeiro jogador

  setInterval(() => atualizarTemporizador(io), 1000); // Atualiza o tempo a cada segundo
};

module.exports = { iniciarTemporizador };