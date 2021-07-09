const mongoose=require('mongoose');
const betterId=require('mongoose-better-id');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const entrySchema= mongoose.Schema({
entryId:{type:String,required:true,unique:true},
    picture:{type:String},
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    approved:{type:Boolean,required:true},
    creator:{type:Schema.Types.ObjectId, ref:'UserModel'}
})

var connection = mongoose.createConnection("mongodb://127.0.0.1:27017",
{useNewUrlParser: true, useUnifiedTopology : true});
entrySchema.plugin(mongooseUniqueValidator);
entrySchema.plugin(betterId,{
    connection,
    field:'entryId',
    prefix: 'ET102',
    suffix:{
        start :1,
        step:1,
        max:99999999999,
    },
    timestamp:{enable:false}
})

module.exports=mongoose.model('EntryModel',entrySchema)