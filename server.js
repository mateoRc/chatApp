const express = require('express');
const http = require('http');

const app = express();
const server = http.Server(app);

server.listen(3333, () => {
    console.log('Dev server is running at port 3333');
});

// Handle the http GET request which prompts us to home dir, respond with hello
app.get('/', (req, res) => {
   res.send('hello'); 
});