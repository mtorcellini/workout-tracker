const mongoose = require('mongoose');
// const moment = require('moment');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day : {
        type : Date,
        default : Date.now()
    }, 
    exercises : {
        type : Array
    },

});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;