const User=require('../../models/schemas/user');
const Entry=require('../../models/schemas/entry');
const {body,query} =require('express-validator/check');


const formatError=(errmsg,errcode)=>
{
  const error = new Error(errmsg);
  error.statusCode = errcode;
  throw error;
}

exports.getAllEntriesValidator= [
  query('userId')
      .custom((value, { req }) => {
          if (req.privilege !== 'Admin' ) {
         formatError('Operation Denied',422)
        }else{
          return true;
        }
      })]


exports.getUserEntriesValidator= [
  query('userId')
      .custom((value, { req }) => {
              if (value !== req.userId ) {
         formatError('Operation Denied',422)
        }else{
          return true;
        }
      })
]



exports.createEntryValidator= [
  query('userId')
      .custom((value, { req }) => {
          if (value !== req.userId) {
         formatError('Operation Denied',422)
        }else{
          return true;
        }
      })
]


exports.updateEntryValidator= [
  query('userId')
      .custom((value, { req }) => {
              if (value !== req.userId && req.privilege !== 'Admin') {
         formatError('Operation Denied',422)
        }else{
          return true;
        }
      })
]


exports.deleteEntryValidator= [
      query('userId')
      .custom((value, { req }) => {
              if (value !== req.userId && req.privilege !== 'Admin') {
         formatError('Operation Denied',422)
        }else{
          return true;
        }
      })
]

exports.approveEntryValidator= [
  query('userId')
      .custom((value, { req }) => {
         
              if (req.privilege !== 'Admin') {
         formatError('Operation Denied',422)
        }else{
            
          return true;
        }
      })     
]