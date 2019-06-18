var express = require('express'); // ExperssJS Framework
var app = express(); // Invoke express to variable for use in application
var port = process.env.PORT || 4000; // Set default port or assign a port in enviornment
var morgan = require('morgan'); // Import Morgan Package
var mongoose = require('mongoose'); // HTTP request logger middleware for Node.js
var bodyParser = require('body-parser'); // Node.js body parsing middleware. Parses incoming request bodies in a middleware before your handlers, available under req.body.
var router = express.Router(); // Invoke the Express Router
var appRoutes = require('./app/routes/api')(router); // Import the application end points/API
var path = require('path'); // Import path module
var User= require('./app/models/user'); 
var multer=require('multer');

app.use(morgan('dev')); // Morgan Middleware
app.use(bodyParser.json()); // Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public')); // Allow front end to access public folder
app.use('/api', appRoutes); // Assign name to end points (e.g., '/api/management/', '/api/users' ,etc. )

var storage=multer.diskStorage({
	destination:function(req,file,cb){
		cb(null,'./public/assets/uploads/files/');
	},
	filename: function(req,file,cb){
		if (!file.originalname.match(/\.(pdf|doc|docx)$/)){
			var err=new Error();
			err.code='fileType';
			return cb(err);
			}else{
				cb(null,Date.now()+'-'+file.originalname);
			}

		}
});




var upload=multer({
	storage:storage,
	limits:{fileSize:10000000}
}).single('myfile');



// 
// <---------- REPLACE WITH YOUR MONGOOSE CONFIGURATION ---------->
// 
mongoose.connect('mongodb+srv://heba:Heba2k@decathlon-zcpsp.mongodb.net/test?retryWrites=true', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});



app.post('/upload',function(req,res){
	upload(req,res,function(err,data){
		console.log(data);
		if(err){
			if(err.code==='LIMIT_FILE_SIZE'){
				res.json({success:false,message:'File size too larger. Max is 10 MB'});	
			}else if(err.code==='fileType'){
				res.json({success:false,message:'File type invalid must be .pdf or .docx' });
			}else{
				console.log(err);
				res.json({success:false,message:'File was not able to be downloaded' , err:err});
			}
		}else{
			if(!req.file){
			 //console.log(req.files);
	         res.json({success:false,message:'No file selected' });

			}else{
				
			res.json({success:true,message:'File uploaded',data:req.file });

			}
		}
	})
})


	// Set Application Static Layout
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // Set index.html as layout
});


// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port); // Listen on configured port

});



