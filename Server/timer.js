
let tempoRestante = 120; // Tempo inicial (seg)
let temporizadorAtivo = false;
let perguntaStatus = 1; // Status inicial da pergunta

// Função para atualizar o temporizador
const atualizarTemporizador = (io) => {
  if (tempoRestante > 0) {
    tempoRestante -= 1;
    io.emit('tempoAtualizado', tempoRestante); // Envia a atualização do tempo para todos os clientes
  } else {
    // Atualiza o status da pergunta
    perguntaStatus += 1;
    if (perguntaStatus > 10) {
      perguntaStatus = 1; // Reinicia o status da pergunta
    }
    io.emit('statusPerguntaAtualizado', perguntaStatus); // Envia a atualização do status da pergunta para todos os clientes

    tempoRestante = 120; // Reinicia o temporizador

  }
};

// Função para iniciar o temporizador
const iniciarTemporizador = (io) => {
  if (temporizadorAtivo) return; // Evita iniciar múltiplos temporizadores
  temporizadorAtivo = true;
  setInterval(() => atualizarTemporizador(io), 1000); // Atualiza o tempo a cada segundo
};

module.exports = { iniciarTemporizador };