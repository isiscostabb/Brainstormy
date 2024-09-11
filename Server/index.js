const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

const PORT = 3001;

const users = []; // Array para armazenar os usuários

let tempoRestante = 120; // Tempo inicial em segundos
let temporizadorAtivo = false;

// Função para atualizar o temporizador
const atualizarTemporizador = () => {
  if (tempoRestante > 0) {
    tempoRestante -= 1;
    io.emit('tempoAtualizado', tempoRestante); // Envia a atualização do tempo para todos os clientes
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
    users.push(username); // ADD novo usuário à lista
    io.emit('updateUserList', users); // enviando lista
    socket.broadcast.emit('userJoined', username); //enviando usuário
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
      io.emit('updateUserList', users); // enviando lista atualizada
      io.emit('userLeft', socket.data.username);  // enviando saida
    }
  });

  // Inicia o temporizador quando o primeiro usuário se conecta
  if (users.length === 0) {
    iniciarTemporizador();
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
