//Import all required modules
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileupload');

// Initialize express app
const app = express();

// Import routers
const {newAdd, indexPage, add, done, about, search} = require('./routes/router');

const port = 6400; // connection port

// Connect uri to MongoDB Atlas

const uri ='mongodb+srv://<username>:<password>@cluster0.asqpg9v.mongodb.net/test'; // Atlas uri

const client = new MongoClient(uri,{
    maxPoolSize:50,
    wtimeoutMS: 2500,
    useNewUrlParser: true
});

client.connect()
    .catch(err=>{
        console.error(err.stack)
        process.exit(1)
    })
    .then(async c => {
        console.log('Connected to MongoDB Atlas database');
    })

global.client = client; // Make connection client accessinle globally

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse form data client
app.use(express.static(path.join(__dirname, '/'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// Routes for the app
app.get('/', indexPage); // Route for loading the front page.
app.get('/add', add); // Route for loading the add dig page.
app.post('/newAdd', newAdd); // Route for posting and processing 'new dig' data.
app.get('/done', done); // Route for posting and processing 'new dig' data.
app.get('/search', search); // Route for searching safari destinations
app.get('/about', about); // Route for posting and processing 'new dig' data.

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

