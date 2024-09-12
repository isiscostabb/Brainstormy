
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

const PORT = 3001;

const users = []; // Array para armazenar usuários
let tempoRestante = 12; // Tempo inicial(seg)
let temporizadorAtivo = false;
let perguntaStatus = 1; // Status inicial pergunta

// Função para atualizar o temporizador
const atualizarTemporizador = () => {
  if (tempoRestante > 0) {
    tempoRestante -= 1;
    io.emit('tempoAtualizado', tempoRestante); // Envia a atualização do tempo para todos os clientes
  } else {
    // Atualiza o status da pergunta
    perguntaStatus += 1;
    if (perguntaStatus > 10) {
      perguntaStatus = 1; // REINICIAR (mudar para depois passar para tela do podio)!!!
    }
    io.emit('statusPerguntaAtualizado', perguntaStatus); // Envia a atualização do status da pergunta para todos os clientes

    // Reinicia o temporizador
    tempoRestante = 12;
  }
};

// Função para iniciar o temporizador
const iniciarTemporizador = () => {
  if (temporizadorAtivo) return; // Evita iniciar múltiplos temporizadores
  temporizadorAtivo = true;
  setInterval(atualizarTemporizador, 1000); // Atualiza o tempo a cada segundo
};

io.on('connection', (socket) => {
  // NOVO USUÁRIO
  socket.on('newUser', (username) => {
    socket.data.username = username;
    users.push(username);
    io.emit('updateUserList', users); // Enviando lista
    socket.broadcast.emit('userJoined', username); // Enviando usuário
  });
  
  // MSG
  socket.on('newMessage', (txt) => {
    io.emit('recebendoMsg', {
      txt,
      authorId: socket.id,
      author: socket.data.username
    });
  });

  // SAINDO
  socket.on('disconnect', (reason) => {
    if (socket.data.username) {
      users.splice(users.indexOf(socket.data.username), 1); // Remove o usuário da lista
      io.emit('updateUserList', users); // Enviando lista atualizada
      io.emit('userLeft', socket.data.username); // Enviando saída
    }
  });

  // Inicia o temporizador quando o primeiro usuário se conecta
  if (users.length === 0) {
    iniciarTemporizador();
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
