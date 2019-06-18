var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var applicantSchema = new Schema({
	fullname:{
		type:String,
		required: true
	},

	phone:{
		type:String,
		required: true,
	},
	email:{
		type:String,
		required: true,
		unique:true
	},
	jobtitle:{
		type:String
	},
	jobId:{
		type:String
	},
	cv:{
		type:String,
		required: true
	},
	date: {
    type: Date
  },
 
  	description:{
  		type:String
  },
  sport:{
  	type:String
  },
  status:{
  	type:String,
  	default:'new'
  },
  note:{
  	type:String
  }
});



var Applicant=mongoose.model('Applicant',applicantSchema);

module.exports = Applicant ;

