// implement your API here
const express = require('express');

const dBase = require('./data/db');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send({Greeting: 'Hello from dBase!'});
});

server.get('/api/users', (req, res) => {
    dBase.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "Failed to find users"
        })
    })
})

server.listen(5000, () => console.log('API running on port 5000'));