const io = require('socket.io')
const app = require('./app');

const socketServer = io(app);

let connectionCount = 0;

const userList = [];
const connectList = [];

const info = (socket) => {
    connectionCount = socketServer.engine.clientsCount;
    console.log('Connection', connectionCount);
    socket.broadcast.emit('CHANGE_COUNT', {count: connectionCount});
    socket.emit('CHANGE_COUNT', {count: connectionCount});
}

socketServer.on('connection', function (socket) {
    console.log('Connection', socket.id);
    connectList[socket.id] = '';

    info(socket);

    socket.on('disconnect', function () {
        socket.broadcast.emit('SERVER_MSG', {username: 'Server', text: `Пользователь ${connectList[socket.id]} отключился`});
        console.log(`Пользователь ${connectList[socket.id]} отключился`);
        info(socket);
    });

    socket.on('CLIENT_CONNECT', (data) => {
        console.log('Connection', data);
        connectList[socket.id] = data.username;

        if (userList.includes(data.username)){
            socket.broadcast.emit('SERVER_MSG', {
                username: 'Server',
                text: `Пользователь ${data.username} переподключился к чату`
            });
        }else{
            userList.push(data.username);
            socket.broadcast.emit('SERVER_MSG', {
                username: 'Server',
                text: `Пользователь ${data.username} подключился к чату`
            });
            socket.emit('SERVER_MSG', {username: 'Server', text: `Пользователь ${data.username} подключился к чату`});
        }
    });

    socket.on('CHANGE_NAME', (data)=>{
        const nameBefore = connectList[socket.id];
        const nameAfter = data.username;

        socket.broadcast.emit('SERVER_MSG', {username: 'Server', text: `Пользователь ${nameBefore} поменял имя на ${nameAfter}`});
        socket.emit('SERVER_MSG', {username: 'Server', text: `Пользователь ${nameBefore} поменял имя на ${nameAfter}`});

        connectList[socket.id] = nameAfter;
        userList.splice( userList.indexOf(nameBefore),1);
        userList.push(data.username);
    });

    socket.on('CLIENT_MSG', (data) => {
        socket.broadcast.emit('SERVER_MSG', {username: data.username, text: data.text});
        socket.emit('SERVER_MSG', {username: data.username, text: data.text});
    });

});

app.listen(3030, () => {
    console.log('Server started on port 3030');
});
