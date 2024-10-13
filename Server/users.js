
// Função para lidar com um novo usuário
const handleNewUser = (socket, username, users, io) => {
    socket.data.username = username; // Armazena o nome de usuário no socket
    users.push(username); // Adiciona o usuário ao array
    io.emit('updateUserList', users); // Envia a lista atualizada para todos os usuários
    socket.broadcast.emit('userJoined', username); // Informa aos outros usuários que um novo usuário entrou
  };
  
  // Função para lidar com a desconexão de um usuário
  const handleUserDisconnect = (socket, users, io) => {
    if (socket.data.username) {
      users.splice(users.indexOf(socket.data.username), 1); // Remove o usuário da lista
      io.emit('updateUserList', users); // Envia a lista atualizada para todos os usuários
      io.emit('userLeft', socket.data.username); // Informa aos outros usuários que um usuário saiu
    }
  };
  
  module.exports = { handleNewUser, handleUserDisconnect };
  