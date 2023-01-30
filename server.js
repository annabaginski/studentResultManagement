const express = require("express");
const path = require("path");
const app = express();
const MongoClient = require("mongodb").MongoClient;

//Set up database tools and dotenv and connect
require("dotenv").config({path: "./config/.env"});

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'StudentResultManagement';

MongoClient.connect(dbConnectionStr, {useUnifiedTopology:true})
    .then(client => {
        console.log(`Connected to ${dbName}`);
        db = client.db(dbName);
    })

//Set up static folder
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

//Set up body parsing for database
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Pull data from database and send frontend html upon initial page load
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.get("/students", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.get("/courses", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.get("/results", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

//Create API to fetch data from database to client side js and post it vice versa
app.get("/studentdata", (req, res) => {
    db.collection('students').find().toArray()
    .then( data => {
        //console.log(data)
        return res.json(data)
    })
    })

app.get("/coursedata", (req, res) => {
    db.collection('courses').find().toArray()
    .then( data => {
        //console.log(data)
        return res.json(data)
    })
    })

app.get("/resultsdata", (req, res) => {
    db.collection('results').find().toArray()
    .then( data => {
        //console.log(data)
        return res.json(data)
    })
    })
    

app.post('/poststudent', (req, res) => {
        //console.log(req.body);

        db.collection('students').insertOne(req.body, (err, result) => {
           if (err) return console.log(err);
           console.log('new student saved to database')
           res.json(result);
           });
        });

app.post('/postcourse', (req, res) => {
        //console.log(req.body);
    
        db.collection('courses').insertOne(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log('new course saved to database')
            res.json(result);
            });
        });

app.post('/postresults', (req, res) => {
        //console.log(req.body);
        
        db.collection('results').insertOne(req.body, (err, result) => {
            if (err) return console.log(err);
            console.log('new results saved to database')
            res.json(result);
            });
        });

//Add catch all at end for urls that do not exist to redirect to home
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

//Run server on a port
app.listen(process.env.PORT || 3000, () => 
    console.log("Server running..."));
