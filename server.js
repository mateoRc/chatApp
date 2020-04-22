const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);
// socket.io needs an http server to send over a socket 
const io = require('socket.io')(server);

server.listen(3333, () => {
    console.log('Dev server is running at port 3333');
});

// Handle the http GET request which prompts us to HOME ('/') dir, respond with file index.html
app.get('/', (req, res) => {
   //res.send('hello');
   res.sendFile(`${__dirname}/index.html`);
});

app.get('/styles/index.css', (req, res) => {
    res.sendFile(`${__dirname}/styles/index.css`);
});

io.on('connection', (socket) => {
    console.log('A user has connected!;');

    socket.on('disconnect', () => {
        console.log('A user has disconnected!');
    });
});