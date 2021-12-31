const express=require('express');
const User = require('../models/schemas/user');
const bcrypt= require("bcryptjs");
const jwt=require('jsonwebtoken');
const path=require('path');
const fs=require('fs');
const {validationResult} = require('express-validator/check')
const crypto=require('crypto');
const aws = require('aws-sdk');

  aws.config.update({

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: process.env.AWS_REGION

  });

  

  const s3 = new aws.S3();




exports.loginController=async (req,res,next)=>{
   try{

    email=req.body.email,
    password=req.body.password

    expressErrorCheck(req);
  
    const user= await User.findOne({email:email});

    if(!user)
    {
        formatError('User not found. Please SignUp First',404)
    }

    const passwordauth=await bcrypt.compare(password,user.password)
    
    if(passwordauth)
    {
 const token=await jwt.sign({privilege:user.privilege,userId:user._id},'create_safest_token_in_the_world',{expiresIn:'1h'})

 
      if(token)
            {
                user.token=token;
        res.status(200).json({user:user,message:"Login success"})
    
    }
    }
    else{
        formatError('Incorrect Password',401)
          }

   }
   catch(err)
   {
       next(err)
   }


}

exports.signupController=async (req,res,next)=>{

try{
    expressErrorCheck(req);

    username=req.body.username,
    email=req.body.email,
    password=req.body.password
    defaultPrivileage="Guest"

// if(!username || !email || !password)
// {
//     const error=new Error();
//     error.data="Insufficient details provided"
//     throw error;
// }

const hash =await bcrypt.hash(password,10)
let user=''

if(req.filepath)
{  
 user= new User({username:username,password:hash,email:email,privilege:defaultPrivileage,profile_picture:req.filepath})
}
else{
     user= new User({username:username,password:hash,email:email,privilege:defaultPrivileage})

}
const result= await user.save();

if(!result.errors){
    
    res.status(201).json({message:"User added successfully",status:200});
}
}
catch(err)
{
    if(req.filepath)
    {
    clearImage(req.filepath)
    }
next(err);
}


}

exports.resetPwdController=async (req,res,next)=>{
let token;
    crypto.randomBytes(20,(err,buffer)=>{
 
     token=buffer;

  })
  const user= await User.findOne({email:req.body.email})

    user.resetPassword=token;
    user.resetPasswordExpiration=Date.now() * 3600000;
    user.save();
    const result=await transport.sendMail({
    to:user.email,
    from:'Narayanan.P@cognizant.com',
    subject:'Password Reset',
    html:`<h1>http:/localhost:8080/api/reset/${token}</h1>`
    })

}

exports.changePrivilegeController=async(req,res,next)=>{

    
    try{
        expressErrorCheck(req);

    const result = await User.updateOne({email:req.body.email},{privilege:req.body.privilege})

    if(!result.errors){
    
        res.status(201).json({message:"User privilege updated successfully",status:200});
    }
    
    }
catch(err)
{

    next(err)
}
}


exports.changeProfilePicture=async(req,res,next)=>{

    
    try{
        expressErrorCheck(req);
        
        if(!req.filepath)
{
formatError('Input file is missing',404);
}
const user= await User.findById(req.query.userId);
        

    const backup_picture=user.profile_picture;
user.profile_picture=req.filepath
              const result=await user.save();

        if(!result.errors)
        {
            if(backup_picture)
            {
           clearImage(backup_picture);
            }
            res.status(201).json({message:"User Profile Picture updated successfully",imagePath:user.profile_picture});
        }
    
    }
    catch(err)
    {
        next(err)
    }

}

exports.changePassword=async (req,res,next)=>{


    try{  
        expressErrorCheck(req);
        
        const hash =await bcrypt.hash(req.body.password,10)
  
        const result = await User.findByIdAndUpdate(req.query.userId,{password:hash},
            function (err, docs) {
if (err){
formatError(err,500)
}

})

        if(!result.errors)
        {   
            res.status(201).json({message:"User password changed successfully"});
        }
    
    }
    catch(err)
    {
        next(err)
    }
}


exports.tokenCheck= async(req,res,next)=>{

    try{

        let decodedToken;
    decodedToken = jwt.verify(req.body.token, 'create_safest_token_in_the_world');

    if (!decodedToken) {
      formatError('Not authenticated',401)
  }

    if(decodedToken.errors)
    {
      formatError('Invalid or expired Authentication Token',406)
    }

    if(!decodedToken.errors)
    {
        const user= await User.findById(req.body.userId)
        user.token=req.body.token
      res.status(200).json({message:'Active user authenticated',user:user})
    }


    }
    catch(err)
    {
        next(err)
    }

}

exports.getUsers=async(req,res,next)=>{

    try{
        const users= await User.find()
        if(users.length === 0)
        {
            formatError('No Users found',404)
        }

        if(!users.errors)
        {
            res.status(200).json({info:"Users Fetched", users:users})
        }
    }
    catch(err)
    {
        next(err)
    }

}

const clearImage=(picture)=>{
    const params={
        Bucket:'guestentrybook',
        Key:picture
    }
    s3.deleteObject(params, (error,data)=>{
        if(error)
        {
            formatError(error,500)
        }
    })  
  }


  const formatError=(errmsg,errcode)=>
  {
    const error = new Error(errmsg);
    error.statusCode = errcode;
    throw error;
  }

  const expressErrorCheck=(req)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      formatError(errors.array()[0].msg,422)
  
    }
  }
