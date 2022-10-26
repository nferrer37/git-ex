const express = require('express')
const cors = require('cors')
const fs = require('fs');

// Firebase database code
var firebase = require('firebase/compat/app');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { initializeFirebaseApp } = require('firestore-export-import')
var auth = require('firebase/compat/auth')
var firestore = require('firebase/compat/firestore')
var lite = require('firebase/firestore/lite')
var admin = require("firebase-admin");

const firebaseConfig = {
    apiKey: "AIzaSyDRcoS-P09EX-_CTNYlf5mvfSfVpkKIyzI",
    authDomain: "company-employee-database.firebaseapp.com",
    databaseURL: "https://company-employee-database-default-rtdb.firebaseio.com",
    projectId: "company-employee-database", 
    storageBucket: "company-employee-database.appspot.com",
    messagingSenderId: "480591196631",
    appId: "1:480591196631:web:5476f5e61641a0a08a5b92"
};

var serviceAccount = require("./company-employee-database-firebase.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
    
// const app = initializeApp(firebaseConfig);
const fireDatabase = getFirestore(app); 

const knex = require('knex');
const configuration = require("./knexfile.js"); 
const { assert } = require('console');
const dataBase = knex(configuration.development);

const server = express();

server.use(cors());
server.use(express.json())

const port = 8080;

// Assigns port for server to listen to
server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

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

server.post('/api', async(req, res) => {

    const employRef = fireDatabase.collection("employees")
    
    // Reading current data from database
    // const snapshot = await employRef.get();
    // snapshot.forEach(doc => {
    // console.log(doc.id, '=>', doc.data());
    // });


    let datData = req.body;

    var dataRows = datData.name.split('\n')

    // Writing data to database
    for(i = 0; i < dataRows.length; i++) {
        let iteratorRow = dataRows[i].split('\t');

        var empId = iteratorRow[0];
        var lastName = iteratorRow[1];
        var firstName = iteratorRow[2];
        var birthDate = iteratorRow[3];
        var phoneNumber = iteratorRow[4];
        var address = iteratorRow[5];
        var social = iteratorRow[6];
        var empDate = iteratorRow[7];

        const data = {
            address: address,
            birthday: birthDate,
            dateAdded: Number(empDate), 
            phoneNumber: phoneNumber,
            social: Number(social),
            username: lastName + ', ' + firstName,
            uniqueId: i
        };
          
        // Add a new document in collection "cities" with ID 'LA'
        const res = await employRef.doc(empId).set(data);
    }
    
    

})

server.post('/database', async(req, res) => {

    const employRef = fireDatabase.collection("employees")

    // Reading current data from database
    const snapshot = await employRef.orderBy('dateAdded').get();
    // if(snapshot.exists) {
        var content = '';
        snapshot.forEach(doc => {

            if(doc.data()['username'] != undefined){
                // console.log(doc.id, '=>', doc.data());
                var empId = doc.id
                var username = doc.data()['username'].split(',')
                var lastName = username[0];
                var firstName = username[1];
                var birthDate = doc.data()['birthday'];
                var phoneNumber = doc.data()['phoneNumber'];
                var address = doc.data()['address']
                var social = doc.data()['social']
                var dateAdded = doc.data()['dateAdded']
                
                content += '<tr>';
                content += '<td>' + empId + '</td>'; //column1
                content += '<td>' + lastName.toUpperCase() + '</td>'; //column2
                content += '<td>' + firstName + '</td>'; //column3
                content += '<td>' + birthDate + '</td>'; //column4
                content += '<td>' + phoneNumber + '</td>'; //column5
                content += '<td>' + address + '</td>'; //column6
                content += '<td>' + social + '</td>'; //column7
                content += '<td>' + dateAdded + '</td>'; //column8
                content += '<td>' + "<input type='button' class='edit' id='edit' value='Edit' onclick='editRow(this)'> <input type='button' id='delete' value='Delete' onclick='deleteRow(this)'>" + '</td>'; //column9: edit/delete

                content += '</tr>?';

            }
           
        }); 
            res.send(JSON.stringify(content))
    // }
}
    
    // let datData = req.body;

    // var dataRows = datData.name.split('\n');
)




/*  git status
    git add .
    git commit -m "COMMENTS"
    git push origin master */
    
    /* fs.writeFile('test.txt', datData.name, (err) => {

    //     if (err) throw err;

    //     // Sends terminal message for server
    //     console.log('file created');

    //     // This makes client side accept response console log
    //     res.send('file created')
    // })*/