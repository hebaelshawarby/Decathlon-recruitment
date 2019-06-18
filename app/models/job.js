var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var jobSchema = new Schema({
    jobtitle:{
        type:String,
        required: true
    },
    sport:{
        type:String
            },
    location:{
        type:String,
        required: true
    },
    locationdes:{
        type:String
    }
    jobtype:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true
    },
    tags:{
        type:String
    },
    description:{
        type:String,
        required: true
    },
    date: {
    type: Date
  },
  duedate:{
    type: Date
  },
  stared:{
    type: String
  }
});



var Job=mongoose.model('Job',jobSchema);

module.exports = Job ;

