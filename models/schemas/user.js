const mongoose=require('mongoose');
const unique_validator=require('mongoose-unique-validator')
const userSchema = mongoose.Schema({

    username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},

resetPassword:{
    type:String
},
resetPasswordExpiration:{
    type:String
},
profile_picture:{
type:String
},

privilege:{
    type:String
    },
token:{type:String}
})

userSchema.plugin(unique_validator);

module.exports=mongoose.model('UserModel',userSchema)