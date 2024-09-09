
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } });

// Conexão!
const PORT = 3001;

const users = []; // Array para armazenar os usuários

io.on('connection', (socket) => {

    // NOVO USUÁRIO
    socket.on('newUser', (username) => { //recebendo usuário
        socket.data.username = username;
        users.push(username); // ADD novo usuário à lista
        io.emit('updateUserList', users); // enviando lista
        socket.broadcast.emit('userJoined', username); //enviando usuário
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
            users.splice(users.indexOf(socket.data.username), 1); // Remove o usuário da lista
            io.emit('updateUserList', users); // enviando lista atualizada
            io.emit('userLeft', socket.data.username);  // enviando saida
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
