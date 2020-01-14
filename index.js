// implement your API here
const express = require('express');

const dBase = require('./data/db');

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send({Greeting: 'Hello from dBase!'});
});

//Get a list of all users in database

// `find()`: calling find returns a promise that resolves to an array of all the users contained in the database.
// GET | /api/users | Returns an array of all the user objects contained in the database.  
// If there's an error in retrieving the _users_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The users information could not be retrieved." }`.

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

// -`findById()`: this method expects an `id` as it's only parameter and returns the user corresponding to the `id` provided or an empty array if no user with that `id` is found.
// | GET    | /api/users/:id | Returns the user object with the specified `id`.   
// When the client makes a `GET` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:
//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in retrieving the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user information could not be retrieved." }`.

server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;
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
        console.log('Data returned an error', err)
    })
})

//Create a user

// | POST   |      | Creates a user using the information sent inside the `request body`.
server.post('/api/users', (req, res) => {
    const userData = req.body;
    // - If the request body is missing the `name` or `bio` property:
    //   - respond with HTTP status code `400` (Bad Request).
    //   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.
        if(!userData.name || !userData.bio) {
            res.status(400).json({
                errorMessage: "Please provide name and bio for the user."
            })
        // - If the information about the _user_ is valid:
        //   - save the new _user_ the the database.
        //   - respond with HTTP status code `201` (Created).
        //   - return the newly created _user document_.
        }else {
            // - `insert()`: calling insert passing it a user object will add it to the database and return an object with the `id` of the inserted user. The object looks like this: `{ id: 123 }`.
            dBase.insert(userData)
            .then(user => {
                console.log(user)
                dBase.findById(user.id)
                .then(userId => {
                    res.status(201).json(userId)
                })
            })
            // - If there's an error while saving the _user_:
            //   - respond with HTTP status code `500` (Server Error).
            //   - return the following JSON object: `{ errorMessage: "There was an error while saving the user to the database" }`.        
            .catch(err => {
                res.status(500).json({
                    errorMessage: "There was an error while saving the user to the database"
                })
            })
            .catch(err => {
                console.log('Data returned an error', err)
            })
        }
    
 })



 

 


 //Remove A User

//  | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.     
//  - `remove()`: the remove method accepts an `id` as it's first parameter and upon successfully deleting the user from the database it returns the number of records deleted.

//  When the client makes a `DELETE` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:
//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If there's an error in removing the _user_ from the database:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user could not be removed" }`.


//Update A User

// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**. |
// When the client makes a `PUT` request to `/api/users/:id`:

// - If the _user_ with the specified `id` is not found:
//   - respond with HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The user with the specified ID does not exist." }`.

// - If the request body is missing the `name` or `bio` property:
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide name and bio for the user." }`.

// - If there's an error when updating the _user_:
//   - respond with HTTP status code `500`.
//   - return the following JSON object: `{ errorMessage: "The user information could not be modified." }`.

// - If the user is found and the new information is valid:
//   - update the user document in the database using the new information sent in the `request body`.
//   - respond with HTTP status code `200` (OK).
//   - return the newly updated _user document_.


server.listen(5000, () => console.log('API running on port 5000'));