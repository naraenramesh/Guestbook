module.exports=(err,req,res,next)=>{
  

    if(err.message.indexOf("is required") > 1){
        const Field=err.message.split(',')[0].split(':')[1]
        err.message=Field.charAt(1).toUpperCase() + Field.slice(2) + " input is missing" 
        err.statusCode=400;
    }
    else  if(err.message.indexOf("to be unique") > 1){
        const Field=err.message.split(',')[0].split(':')[1]
        err.message=Field.charAt(1).toUpperCase() + Field.slice(2) + " already exists"
        err.statusCode=409;
    }
 
    if(!err.statusCode)
    {
        err.statusCode=500
      //err.message="Error Occured"
    }
    // if(res.status = 400)
    // {
    // err.message="Error Occured"
    // }
      res.status(err.statusCode).json({message:err.message})
  
}
  