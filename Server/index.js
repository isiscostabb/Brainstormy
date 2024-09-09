
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

// Conexão!
const PORT = 3001;

io.on('connection', (socket) => {
    
    // NOVO USUÁRIO
    socket.on('newUser', (username) => { //recebendo
        socket.data.username = username;
        socket.broadcast.emit('userJoined', username); //enviando  AQUIII
    });

    // MSG
    socket.on('newMessage', (txt) => { //recebendo
        io.emit('recebendoMsg', { //enviando
            txt,
            authorId: socket.id,
            author: socket.data.username
        });
    });

    // SAINDO
    socket.on('disconnect', (reason) => { //recebendo
        if (socket.data.username) {
            io.emit('userLeft', socket.data.username);  // enviando
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));