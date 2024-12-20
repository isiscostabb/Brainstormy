
let contagem = 1;
let temporizadorAtivo = false;
let tempoTotal = 60;
let tempoInicial;

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

const atualizarTemporizador = (io) => {
  const tempoRestante = calcularTempoRestante();

  if (tempoRestante > 0) {
    io.emit('tempoAtualizado', tempoRestante);
    io.emit('statusPerguntaAtualizado', contagem);
  } else {

    if (contagem > 10) {
      io.emit('jogoFinalizado'); // Emite evento quando o jogo terminar
      contagem = 11;
    }

    tempoInicial = new Date().getTime();
  }
};

const iniciarTemporizador = (io) => {
  if (temporizadorAtivo) return;
  temporizadorAtivo = true;
  tempoInicial = new Date().getTime();

  setInterval(() => atualizarTemporizador(io), 1000);
};

module.exports = { iniciarTemporizador };