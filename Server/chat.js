
// Função para lidar com uma nova mensagem
const handleNewMessage = (socket, txt, io) => {
    io.emit('recebendoMsg', {
      txt,
      authorId: socket.id,
      author: socket.data.username
    }); // Envia a nova mensagem para todos os clientes
  };
  
  module.exports = { handleNewMessage };
  