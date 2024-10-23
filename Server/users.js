
// Novo usuário
const handleNewUser = (socket, username, users, io) => {
    socket.data.username = username; // Armazena o nome de usuário no socket
    users.push(username); // Adiciona o usuário ao array
    io.emit('updateUserList', users); // Envia a lista atualizada para todos os usuários
    socket.broadcast.emit('userJoined', username); // Informa aos outros usuários que um novo usuário entrou
  };
  
  // Desconexão usuário
  const handleUserDisconnect = (socket, users, io) => {
    if (socket.data.username) {
      users.splice(users.indexOf(socket.data.username), 1); // Remove o usuário da lista
      io.emit('updateUserList', users); // Envia a lista atualizada para todos os usuários
      io.emit('userLeft', socket.data.username); // Informa aos outros usuários que um usuário saiu
    }
  };
  
  module.exports = { handleNewUser, handleUserDisconnect };
  