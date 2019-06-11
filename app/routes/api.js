var User= require('../models/user'); 
var Applicant= require('../models/applicant');
var Job=require('../models/job');
var jwt = require('jsonwebtoken');
var secret= 'harrypotter';


module.exports = function(router){
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


router.get('/getjobs',function(req,res){
	User.findOne({fullname:req.decoded.fullname},function(err,user){
		if(err) throw err;
		if(!user)
			res.json({success:false,message:'no user'});
		else
			
			{
				Job.find({},function(err,apps){
		if(err) res.json({success: false,err:err});
		else

		res.json({success:true,jobs:apps});
		
	})
			}
			
			
	})
		
	
})

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

