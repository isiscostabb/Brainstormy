
// Lidar com mensagens no chat

const handleNewMessage = (socket, txt, io) => {
    io.emit('recebendoMsg', {
      txt,
      authorId: socket.id,
      author: socket.data.username
    });
  };
  
  module.exports = { handleNewMessage };