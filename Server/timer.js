
let contagem = 1;
let temporizadorAtivo = false;
let tempoTotal = 120;
let tempoInicial;

// Calcular tempo restante
const calcularTempoRestante = () => {
  const agora = new Date().getTime();
  const tempoDecorrido = Math.floor((agora - tempoInicial) / 1000);
  const tempoRestante = tempoTotal - tempoDecorrido;

  if (tempoRestante > 0) {
    return tempoRestante;
  } else if (tempoRestante <= 0) {
    contagem += 1;
  
    return 0;
  }
};

// Atualizar temporizador
const atualizarTemporizador = (io) => {
  const tempoRestante = calcularTempoRestante();

  if (tempoRestante > 0) {
    io.emit('tempoAtualizado', tempoRestante); // Manda atualização do tempo
    io.emit('statusPerguntaAtualizado', contagem); // Manda status da pergunta

  } else {

    if (contagem > 10) {
      contagem = 1; // add logica para ir para podio
    }
    
    tempoInicial = new Date().getTime(); // Reinicia o temporizador
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