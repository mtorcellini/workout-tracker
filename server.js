const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const mongojs = require('mongojs');


mongoose.connect( "mongodb://localhost/workout", {useNewUrlParser: true, useUnifiedTopology: true} );
const db = require('./models');

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

// -----------------------------------------------------
// api routes

// workout dashboard
app.get('/api/workouts/range', (req, res) => {
    db.Workout.find().then( (result) => {
        res.json(result);
    });
});

// new workout
app.post('/api/workouts/', (req, res) => {
    db.Workout.create({}).then( (result) => {
        console.log(result);
        res.json(result);
    });
});

// update workout
app.put('/api/workouts/:id', (req, res) => {
    let idToUpdate = req.params.id;
    db.Workout.updateOne({_id : mongojs.ObjectID(idToUpdate)}, {$push : {exercises : req.body}}, (err, result) => {
        res.json(result);
    });
});

// -----------------------------------------------------


app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});






