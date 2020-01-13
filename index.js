// implement your API here
const express = require('express');

const dBase = require('./data/db');

const server = express();

server.get('/', (req, res) => {
    res.send({Greeting: 'Hello from dBase!'});
});

server.get('/api/users', (req, res) => {
    const users = 
})

server.listen(5000, () => console.log('API running on port 5000'));