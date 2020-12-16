const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    type : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    weight : {
        type : Number
    }, 
    sets : {
        type : Number
    },
    reps : {
        type : Number
    },
    duration : { 
        type : Number,
        required : true
    },
    distance : {
        type : Number
    }
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;