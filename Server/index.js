
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

const { iniciarTemporizador } = require('./timer');
const { handleNewUser, handleUserDisconnect } = require('./users');
const { handleNewMessage } = require('./chat');

const PORT = 3001;
const users = []; // Array para armazenar usuários

io.on('connection', (socket) => {
  // NOVO USUÁRIO
  socket.on('newUser', (username) => handleNewUser(socket, username, users, io));
  
  // MSG    
  socket.on('newMessage', (txt) => handleNewMessage(socket, txt, io));
  
  // SAINDO
  socket.on('disconnect', (reason) => handleUserDisconnect(socket, users, io));

  // Inicia o temporizador quando o primeiro usuário se conecta      
  if (users.length === 0) {
    iniciarTemporizador(io);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
