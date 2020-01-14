// implement your API here
const express = require('express');

const dBase = require('./data/db');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send({Greeting: 'Hello from dBase!'});
});

//Get a list of all users in database

server.get('/api/users', (req, res) => {
    dBase.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({
            errorMessage: "The users information could not be retrieved."
        })
    })
})

//Get User By Id

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    dBase.findById(id)
    .then(user => {
        if(!user) {
            res.status(404).json({
                errorMessage: "The user with the specified ID does not exist."
            })
        }
        res.status(200).json(user);
    }) 
    .catch(err => {
        res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
        })
    })
})

//Create a user

// server.post('/api/users', (req, res) => {
//     const userData = req.body;
// })

server.listen(5000, () => console.log('API running on port 5000'));