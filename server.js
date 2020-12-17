const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const mongojs = require('mongojs');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const db = require('./models');

const PORT = process.env.PORT || 3000;

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

// get last workout
app.get('/api/workouts/', (req, res) => {
    db.Workout.find().sort({day : 1 }).then( (result) => {
        res.json(result);
    })
})

// new workout
app.post('/api/workouts/', (req, res) => {
    const workoutToDo = new db.Workout();
    db.Workout.create(workoutToDo).then( (result) => {
        res.json(result);
    });
});

// update (new) workout
app.put('/api/workouts/:id', (req, res) => {
    db.Workout.updateOne({_id : mongojs.ObjectID(req.params.id)}, {$push : {exercises : req.body}}, (err, result) => {
        res.json(result);
    });
});


// -----------------------------------------------------


app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});






