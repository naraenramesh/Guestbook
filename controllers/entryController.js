const Entry=require('../models/schemas/entry')
const {validationResult} = require('express-validator/check');
const path=require('path')
const fs=require('fs')
const aws = require('aws-sdk');

  aws.config.update({

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: process.env.AWS_REGION

  });

  

  const s3 = new aws.S3();

exports.getUserEntries=async(req,res,next)=>{
    const currentPage = req.params.pageNumber || 1;
    const perPage = 2;
    let entries;
    try{   

        expressErrorCheck(req);


 
const totalItems = await Entry.find({creator:req.query.userId}).countDocuments();

if(req.params.pageNumber)
{
     entries= await Entry.find({creator:req.query.userId}).populate('creator')
    .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
}
else{
     entries= await Entry.find({creator:req.query.userId}).populate('creator')
}

if(entries.length === 0)
{
    formatError('No Entries found',404)
}
if(!entries.errors)
{
    res.status(200).json({info:"Entries of this user are fetched", entries:entries,totalEntries:totalItems})

}
} 
catch(err)
{
    next(err);
}
    }

exports.getAllEntries=async(req,res,next)=>{
    const currentPage = req.params.pageNumber || 1;
    const perPage = 2;
    let entries;
    try{
        expressErrorCheck(req);

        
 
        const totalItems = await Entry.find().countDocuments();
        if(req.params.pageNumber)
        {
         entries= await Entry.find().populate('creator')
            .sort({ createdAt: -1 })
              .skip((currentPage - 1) * perPage)
              .limit(perPage);
        }
        else{
         entries= await Entry.find().populate('creator')
        }

        if(entries.length === 0)
{
    formatError('No Entries found',404)
}
        if(!entries.errors)
        {
            res.status(200).json({info:"All Entries are fetched", entries:entries,totalEntries:totalItems})
        
        }
            }
        catch(err)
        {
            next(err);
        }
        
    }

exports.createEntry=async(req,res,next)=>{
//Entry.deleteOne({title:'sd'}).then(()=>console.log("Deleted"))
    default_approval=false;
  
try{
    let entry;

    expressErrorCheck(req);
   
    if(req.file)
{  
     entry= new Entry({title:req.body.title,description:req.body.description
        ,approved:default_approval,creator:req.query.userId,picture:req.file.path})
}
else{
     entry= new Entry({title:req.body.title,description:req.body.description
        ,approved:default_approval,creator:req.query.userId})

}

const result= await entry.save();

const entry_out= await Entry.findOne({title:req.body.title}).populate('creator')

if(!result.errors)
{console.log(entry_out)
        res.status(200).json({message:"Entry created",entry:entry_out})

}
    }
catch(err)
{
  
    if(req.file)
    {
    clearImage(req.file.path)
    }
    next(err)
}

}

exports.updateEntry=async(req,res,next)=>{

    try{
        let backup_picture;
        expressErrorCheck(req);
        
        const entry= await Entry.findOne({entryId:req.body.entryId}).populate('creator')
        
        entry.title=req.body.title;
       entry.description=req.body.description;
     
       
        if(req.file)
        {
      
         backup_picture=entry.picture
      
            entry.picture= req.file.path;
    
        }
       const result=await entry.save();
    
    if(!result.errors)
    {
        if(req.file)
        {    
        clearImage(backup_picture);
        }
        
        res.status(200).json({message:"Entry updated",entry:entry})
    
    }
        }
    catch(err)
    {
        if(req.file)
        {
    clearImage(req.file.path)
        }
        next(err)
    }
    
}


exports.deleteEntry=async(req,res,next)=>{
    
   
    try{
        
     
          expressErrorCheck(req);

        const entry=await Entry.findOne({entryId:req.body.entryId})

        const result= await Entry.deleteOne({entryId:req.body.entryId})
  
        if(result.deletedCount === 0)
        {
            formatError('No Entries found',404)
        }
    
    if(!result.errors)
    {
        entry.picture="images/entryPictures/2021071244503-Koala.jpg"
        //clearImage(entry.picture);
        const params={
            Bucket:'guestentrybook',
            Key:entry.picture
        }
        s3.deleteObject(params, (error,data)=>{
            if(error)
            {
                res.status(500).send(error)
            }
           // res.status(200).send("s3 gone")
           if(data)
           {console.log(data)
           res.status(200).json({message:"Entry deleted" ,entryId:req.body.entryId})
           }
        })

            
    }
        }
    catch(err)
    {
        next(err)
    }
    
}

module.exports.approveEntry=async(req,res,next)=>{

    try{

        expressErrorCheck(req);

        const entry= await Entry.findOne({entryId:req.body.entryId})
        if(!entry)
{
    formatError('No Entry found',404)
}

       entry.approved= true;

    const result=await entry.save();
    
    if(!result.errors)
    {
        res.status(200).json({message:"Entry Approved",entryId:entry.entryId})
    }
    }

    catch(err)
    {
        next(err)
    }
}

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, err => {console.log(err)});
  };

  
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