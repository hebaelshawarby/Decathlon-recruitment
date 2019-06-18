var User= require('../models/user'); 
var Applicant= require('../models/applicant');
var Job=require('../models/job');
var jwt = require('jsonwebtoken');
var secret= 'harrypotter';
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var sgTransport = require('nodemailer-sendgrid-transport');


module.exports = function(router){




	router.get('/getjobs',function(req,res){
	
				Job.find({},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,jobs:apps});
		
	})
			})
			
		router.post('/getjobssport',function(req,res){
		
				Job.find({sport:req.body.sport},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,jobs:apps});
		
	})
			})

		router.post('/getjoblocation',function(req,res){
		
				Job.find({location:req.body.location},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,jobs:apps});
		
	})
			})
	
	router.post('/getjobscat',function(req,res){
		
				Job.find({category:req.body.category},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,jobs:apps});
		
	})
			})

// get recent jobs

router.get('/getrecentjobs',function(req,res){
		
				Job.find({},function(err,apps){
		if(err) res.json({success: false,err:err});
		else
			recent=[];
		for(var i=0; i<4;i++){
			recent.push(apps[apps.length-1-i])
			

		}

		res.json({success:true,jobs:recent});
		
	})

})


// get high priority jobs

router.get('/gethighpriority',function(req,res){
	
		
				Job.find({stared:"high"},function(err,apps){
		if(err) res.json({success: false,err:err});
		else
		
		res.json({success:true,jobs:apps});
		
	})
			
			
			
	
		
	
})




var options={
	auth:{
		api_user:'hebaelshawarby',
		api_key:'Heba2k6991'
	}
}

var client = nodemailer.createTransport(sgTransport(options));



	router.post('/users',function(req,res){
	var user= new User();
	user.fullname=req.body.fullname;
	user.phone=req.body.phone;
	user.email=req.body.email;
	user.password=req.body.password;
	user.permission=req.body.permission;
	if(req.body.fullname==null||req.body.fullname=='')
	{
		res.send('ensure username is provided');
	}
	else
	{
		user.save(function(err){
		if(err){
			console.log(err);
			res.json({success: false,message:'ensure fname w kda',err:err});
		}
		else
		{
		
			res.json({success: true,message:'saved'});
		}

	});
	}			
})


	router.post('/createadmin',function(req,res){
	var user= new User();
	user.fullname=req.body.fullname;
	user.phone=req.body.phone;
	user.email=req.body.email;
	user.password=req.body.password;
	user.permission=req.body.permission;
	user.department=req.body.department;
	if(req.body.fullname==null||req.body.fullname=='')
	{
		res.send('ensure username is provided');
	}
	else
	{
		user.save(function(err){
		if(err){
			console.log(err);
			res.json({success: false,message:'ensure fname w kda',err:err});
		}
		else
		{
			var email = {
						from: 'Localhost Staff, staff@localhost.com',
						to: 'heba.shawarby2@gmail.com',
						subject: 'Localhost Activation Link',
						text: 'Hello ' + user.name + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost:8080/activate/' + user.temporarytoken,
						html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/activate/' + user.temporarytoken + '">http://localhost:8080/activate/</a>'
					};
					// Function to send e-mail to the user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error with sending e-mail, log to console/terminal
					});
		
			res.json({success: true,message:'saved'});
		}

	});
	}			
})




router.post('/apply',function(req,res){
	var applicant= new Applicant();
	applicant.fullname=req.body.fullname;
	applicant.phone=req.body.phone;
	applicant.email=req.body.email;
	applicant.cv=req.body.cv;
	applicant.jobtitle=req.body.jobtitle;
	applicant.date=req.body.date;
	applicant.description=req.body.description;
	applicant.sport=req.body.sport;
	// if(req.body.fullname==null||req.body.fullname=='')
	// {
	// 	res.send('ensure username is provided');
	// }
	// else
	// {
		applicant.save(function(err){
		if(err){

			res.json({success: false,message:'ensure fname w kda',err:err});
		}
		else
		{
		
			res.json({success: true,message:'saved'});
		}

	});
	//}		
})





router.post('/postjob',function(req,res){
	var job= new Job();
	job.jobtitle=req.body.jobtitle;
	job.jobtype=req.body.jobtype;
	job.location=req.body.location;
	job.description=req.body.description;
	job.category=req.body.category;
	job.date=req.body.date;
	job.tags=req.body.tags;
	job.stared=req.body.stared;
	job.sport=req.body.sport;
	console.log(job)
	if(req.body.jobtitle==null||req.body.jobtitle=='')
	{
		res.send('ensure title is provided');
	}
	else
	{
		job.save(function(err){
		if(err){

			res.json({success: false,message:'ensure fname w kda',err:err});
		}
		else
		{
		
			res.json({success: true,message:'saved'});
		}

	});
	}		
})








// user login
router.post('/authenticate',function(req,res){
	console.log(req.body.fullname)
	console.log(req.body.password)

	User.findOne({fullname: req.body.fullname}).select('email fullname password ').exec(function(err,user){
		if(err) throw err;
		if(!user)
		{
			res.json({success:false,message:'cannot authenticate user'})
		}
		else if(user){
		var validPassword=	user.comparePassword(req.body.password);
		if(!validPassword){
			res.json({success:false,message:'couldnot authenticate'})
		}else{
			var token=jwt.sign({fullname:user.fullname, email:user.email,permission:user.permission},secret,{expiresIn:'24h'});
			res.json({success:true,message: 'authenticated',token:token })	
		}
		// else if(user.isAdmin){
		// 	var token=jwt.sign({username:user.fullname, email:user.email},secret,{expiresIn:'24h'});
		// 	res.json({success:true,message: 'authenticated',token:token})
		// }
		// else{	
		// 	res.json({success:false,message:'couldnot authenticate not admin'})
		// }
		}
	})
})


	router.use(function(req,res,next){
		var token = req.body.token|| req.body.query|| req.headers['x-access-token']; 
		if(token){
			jwt.verify(token,secret,function(err,decoded){
				if(err) res.json({success:false,message:'Token invalid'});
				else{
				req.decoded=decoded;
				next();
			}
			})
		}
		else
		{
			res.json({success:false,message:'no token provided'});
		}
	})
	router.post('/me',function(req,res){
		res.send(req.decoded);	   
	})


router.get('/permission',function(req,res){
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		console.log(user);
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			res.json({success:true,permission:user.permission })
	})
})

//					ADMIN CREATE MODERATOR

router.post('/createmoderator',function(req,res){
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			if(user.permission==='admin')
			{
				var user= new User();
				user.fullname=req.body.fullname;
				user.phone=req.body.phone;
				user.email=req.body.email;
				user.password=req.body.password;
				user.department=req.body.department;
				if(req.body.fullname==null||req.body.fullname=='')
				{
					res.send('ensure username is provided');
				}
				else
				{
					user.save(function(err){
					if(err){
						console.log(err);
						res.json({success: false,message:'ensure fname w kda',err:err});
					}
					else
					{
					
						res.json({success: true,message:'saved'});
					}

				});
				}	
			}
			else
			{
				res.json({success:false,message:'user is not admin' })
			}
			
	})
		
})


//				ADMIN CREATE APPLICANT

router.post('/createapplicant',function(req,res){
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{
				var applicant= new Applicant();
				applicant.fullname=req.body.fullname;
				applicant.phone=req.body.phone;
				applicant.email=req.body.email;
				applicant.cv=req.body.cv;
				applicant.jobtitle=req.body.jobtitle;
				applicant.date=req.body.date;
				applicant.description=req.body.description;
				applicant.jobId=req.body.jobId;
				applicant.sport=req.body.sport;
			
					applicant.save(function(err){
					if(err){

						res.json({success: false,message:'ensure fname w kda',err:err});
					}
					else
					{
					
						res.json({success: true,message:'saved'});
					}

				});	
			}
			
			
	})
		
})

//						ADMIN GET ALL MODERATORS


router.get('/getModerators',function(req,res){

		User.findOne({fullname:req.decoded.fullname},function(err,admin){
			if(err) throw err;
			if(!admin){
				res.json({success:false,message:'No user found'});
			}else{
				if(admin.permission==='admin'){
					User.find({permission:'moderator'},function(err,mod){
						if(!mod){
				res.json({success:false,message:'No mod found'});
			}else
			{
				res.json({success:true,mod:mod})
			}
					})
				}else{
					res.json({success:false,message:'no permission'})
				}
			}
		})
	
})







// 			Admin get all applicants

router.get('/management',function(req,res){
	Applicant.find({},function(err,apps){
		if(err) throw err;
		User.findOne({fullname:req.decoded.fullname},function(err,admin){
			if(err) throw err;
			if(!admin){
				res.json({success:false,message:'No user found'});
			}else{
				if(admin.permission==="admin"||admin.permission==="moderator"){
					if(!apps){
						res.json({success:false,message:'No APPlicants'})

					}else{
						res.json({success:true,apps:apps,permission:admin.permission});
			

					
				}


				}else{
					res.json({success:false,message:'no permission'})
				}
			}
		})
	})
})


// 					ADMIN GET ALL JOBS




//			GET ALL APPICANTS OF SPECIFIC JOB



router.post('/jobapplicants',function(req,res){
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{

				Applicant.find({jobId:req.body.jobId},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,applicants:apps});
		
	})
			}
			
			
	})
		
	
})
  

 //          DELETE AN APPLICANT

 router.delete('/deleteuser/:ids',function(req,res){
 	var deleteduser=req.params.ids;
 	console.log(deleteduser)
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{
				console.log("innn");

				Applicant.findByIdAndRemove(deleteduser,function(err,apps){
					console.log(apps);
		if(err) 

			res.json({success: false,err:err});
		else

		res.json({success:true});
		
	})
			}
			
			
	})
		
	
})


 //admin delete job


 router.delete('/deletejob/:ids',function(req,res){
 	var deletedjob=req.params.ids;
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else if(user.permission!=='admin'){

res.json({success:false,message:'not authorized '});
		}else
			
			{	

				Job.findByIdAndRemove(deletedjob,function(err,apps){
		if(err) 

			res.json({success: false,err:err});
		else

		res.json({success:true});
		
	})
			}
			
			
	})
		
	
})


// admin change status

router.put('/putstatus',function(req,res){
	var newstatus=req.body.status;
	var applicantid=req.body._id;
	console.log(applicantid)
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{

				Applicant.findOne({_id:applicantid},function(err,app){
					if(err)
						throw err;
					if(!app){
						res.json({success:false,message:'no applicant found'})
					}else{
						app.status=newstatus;
						app.save(function(err){
							if(err){
								console.log(err)
							}else{
								if(newstatus==='rejected'){
									var email = {
						from: 'Decathlon Egypt Team, careers@decathlon.com',
						to: 'heba.shawarby2@gmail.com',
						subject: 'Application Status',
						text: 'Hello ' + app.fullname + ', thank you for your interest in Decathlon Egypt. Sorry You are rejected',
						html: 'Hello<strong> ' + app.fullname + '</strong>,<br><br>thank you for your interest in Decathlon Egypt. Sorry You are rejected<br><br>'
					};
					// Function to send e-mail to the user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error with sending e-mail, log to console/terminal
					});
								}
								if(newstatus==='hiredandsendemail'){
									var email = {
						from: 'Decathlon Egypt Team, careers@decathlon.com',
						to: 'heba.shawarby2@gmail.com',
						subject: 'Application Status',
						text: 'Hello ' + app.fullname + ', thank you for your interest in Decathlon Egypt. Congratulation you are hired',
						html: 'Hello<strong> ' + app.fullname + '</strong>,<br><br>thank you for your interest in Decathlon Egypt.Congratulation you are hired<br><br>'
					};
					// Function to send e-mail to the user
					client.sendMail(email, function(err, info) {
						if (err) console.log(err); // If error with sending e-mail, log to console/terminal
					});
						
								}
								res.json({success:true,message:'status has been updated'})
							}
						})
					}
				})
				

			}
			
			
	})
		
})
 
 //admin add note


router.put('/putnote',function(req,res){
	var newnote=req.body.note;
	var applicantid=req.body._id;
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{

				Applicant.findOne({_id:applicantid},function(err,app){
					if(err)
						throw err;
					if(!app){
						res.json({success:false,message:'no applicant found'})
					}else{
						app.note=newnote;
						app.save(function(err){
							if(err){
								console.log(err)
							}else{
								
								res.json({success:true,message:'note has been updated'})
							}
						})
					}
				})
				

			}
			
			
	})
		
})



// admin edit job


 router.put('/editjob', function(req, res) {
        var jobid = req.body._id; // Assign _id from user to be editted to a variable
        if (req.body.jobtitle) var jobtitle = req.body.jobtitle; // Check if a change to name was requested
        if (req.body.sport) var sport = req.body.sport; // Check if a change to username was requested
        if (req.body.location) var location = req.body.location; // Check if a change to e-mail was requested
        if (req.body.jobtype) var jobtype = req.body.jobtype; // Check if a change to permission was requested
        if (req.body.category) var category = req.body.category; // Check if a change to name was requested
        if (req.body.tags) var tags = req.body.tags; // Check if a change to username was requested
        if (req.body.description) var description = req.body.description; // Check if a change to e-mail was requested
        if (req.body.duedate) var duedate = req.body.duedate; 
        if (req.body.stared) var stared = req.body.stared; // Check if a change to permission was requested


        // Look for logged in user in database to check if have appropriate access
        User.findOne({ fullname: req.decoded.fullname }, function(err, mainUser) {
            if (err) throw err; // Throw err if cannot connnect
            // Check if logged in user is found in database
            if (!mainUser) {
                res.json({ success: false, message: "no user found" }); // Return erro
            } else {
                // Check if a change to name was requested
                if (jobtitle) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.jobtitle = jobtitle; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'jobtitle has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }

                // Check if a change to username was requested
                if (sport) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.sport = sport; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'sport has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }

                // Check if change to e-mail was requested
                if (location) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.location = location; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'location has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }

                 if (jobtype) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.jobtype = jobtype; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'jobtype has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }


                 if (category) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.category = category; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'category has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }

                if (tags) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.tags = tags; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'tags has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }

                    if (description) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.description = description; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'description has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }


                    if (duedate) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.duedate = duedate; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'duedate has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                    }
                }


                if (stared) {
                    // Check if person making changes has appropriate access
                    if (mainUser.permission === 'admin' || mainUser.permission === 'moderator') {
                        // Look for user in database
                        Job.findOne({ _id: jobid }, function(err, job) {
                            if (err) throw err; // Throw error if cannot connect
                            // Check if user is in database
                            if (!job) {
                                res.json({ success: false, message: 'No job found' }); // Return error
                            } else {
                                job.stared = stared; // Assign new name to user in database
                                // Save changes
                                job.save(function(err) {
                                    if (err) {
                                        console.log(err); // Log any errors to the console
                                    } else {
                                        res.json({ success: true, message: 'stared has been updated!' }); // Return success message
                                    }
                                });
                            }
                        });
                    } else {
                        res.json({ success: false, message: 'Insufficient Permissions' }); // Return error
                      }
                }
            }
        });
    });





router.get('/applicant/:id',function(req,res){
	Applicant.findOne({_id:req.params.id},function(err,user){
		if(err) throw err;
		User.findOne({fullname:req.decoded.username},function(err,admin){
			if(err) throw err;
			if(!admin){
				res.json({success:false,message:'No user found'});
			}else{
				if(admin.isAdmin){
					if(!user){
						res.json({success:false,message:'No user'})

					}else{
						res.json({success:true,user:user,permission:admin.isAdmin});
					}
				}else{
					res.json({success:false,message:'no permission'})
				}
			}
		})
	})
})



	return router;
}

