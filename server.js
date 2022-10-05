const express = require('express')
const cors = require('cors')
const fs = require('fs');

// import fs from 'fs';

const server = express();

server.use(cors());
server.use(express.json())

const port = 8080;

const knex = require('knex');
const configuration = require("./knexfile.js"); 
const dataBase = knex(configuration.development);

server.get('/', (req, res) => {

    //example fetch request from frontend:
    // fetch('http://localhost:8080/').then(res => res.json()).then(data => console.log(data))

    // Get res data from the front end like:
    // let data = req.body.name

    // Write code to update database

    // send back res with data that you requested/need on front end 
    res.status(200).json({NAME: 'Got it'})
})

server.get('/api', (req, res) => {
    res.status(200).json({NAME: 'Got it'})
})

server.post('/api', (req, res) => {
    let datData = req.body;

    console.log(datData.name)
    
    fs.writeFile('test.txt', datData.name, (err) => {

        if (err) throw err;

        // Sends terminal message for server
        console.log('file created');

        // This makes client side accept response console log
        res.send('file created')
    })

})

// Assigns port for server to listen to
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

/*  git status
    git add .
    git commit -m "COMMENTS"
    git push origin master */