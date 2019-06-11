var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var userSchema = new Schema({
    fullname:{
        type:String,
        lowercase:true,
        required: true,
        unique:true
    },
    phone:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        lowercase:true,
        required: true,
        unique:true
    },
    password:{
        type:String
    },

    permission:{
        type:String,
        default:'moderator'
    },
    department:{
        type:String
    }

});

userSchema.pre('save',function(next){
    var user=this;
    bcrypt.hash(user.password,null,null,function(err,hash){
        if(err)return next(err);
        user.password=hash;
        next();

    })
})

userSchema.methods.comparePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}




var User=mongoose.model('User',userSchema);

module.exports = User ;

var a = new User({
  fullname: "cherif",

  password: "cherif",

  email:"cherif@gmail.com",
  phone:'992929292',
  isAdmin: true
});


var InsertAdmin=function(a){
  a.save((err)=>{
    if(err)
      throw err
    else
      console.log("ADDED");

  })
}

// InsertAdmin(a);

