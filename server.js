const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const PORT = 3000;

const app = express();
app.use(logger("dev")); // use morgan for logging
app.use(express.static("public")); // serve public folder
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ----------------------------------------------------- 
// html routes
app.get('/exercise', (req, res) => {
    res.sendFile(__dirname + '/public/exercise.html');
});

app.get('/stats', (req, res) => {
    res.sendFile(__dirname + '/public/stats.html');
});
// ----------------------------------------------------- 


app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});






