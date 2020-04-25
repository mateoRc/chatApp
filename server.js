const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

// socket.io needs an http server to send over a socket 
const io = require('socket.io')(server);

const users = [];

server.listen(3333, () => {
    console.log('Dev server is running at port 3333');
});

// Handle the http GET request which prompts us to HOME ('/') dir, respond with file index.html
app.get('/', (req, res) => {
   
    // test
    // res.send('hello');
    res.sendFile(`${__dirname}/index.html`);
});

app.get('/styles/index.css', (req, res) => {
    res.sendFile(`${__dirname}/styles/index.css`);
});

io.on('connection', (socket) => {
    let name = '';
    
    // test
    // console.log('A user has connected!;');
     socket.on('has connected', (username) => {
        name = username;
        users.push(username);
        
        // emit to ALL sockets
        io.emit('has connected', {username: username, userList: users});
    });

    socket.on('disconnect', () => {
        users.splice(users.indexOf(name), 1);
        console.log('A user has disconnected!');
        io.emit('has disconnected', {username: name, userList: users})
    });

    // handle the submit message event
    socket.on('new message', (messageData) => {
        console.log(messageData);
        io.emit('new message', {username: messageData.username, message: messageData.message});
    });

});