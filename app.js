require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose');
const bodyParser= require('body-parser');
const path=require('path');
const app=express();
const User=require('./models/schemas/user');
const Entry=require('./models/schemas/entry');
const UserRouter=require('./models/routes/userRoute');
const EntryRouter=require('./models/routes/entryRoute');
const dateFormat = require('dateformat');

const config=require('./config/covict_config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/",express.static(path.join(__dirname,"angular")));
User.deleteMany({username:'naraen'}).then(rs=>console.log('success'))
app.use(express.static('public'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });


app.use("/api",UserRouter);
app.use("/api",EntryRouter);
app.use((req,res,next)=>{
  res.sendFile(path.join(__dirname,"angular","index.html"))
})


mongoose.connect("mongodb+srv://guestbook:4ePDASE8TwWFDm3M@guestbook.nxb5s.mongodb.net/guestbook?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology : true})
.then(()=>{
    console.log("Connected to Database");
    app.listen(config.get('port'))

console.log("Running in " + config.get('env') + " mode at port " +config.get('port'));
}).catch((err)=>
{console.log(err)}
)


module.exports=app;