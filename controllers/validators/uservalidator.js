const User=require('../../models/schemas/user');

const {check,body,query} =require('express-validator');

const formatError=(errmsg,errcode)=>
{
  const error = new Error(errmsg);
  error.statusCode = errcode;
  throw error;
}


exports.loginValidator=  [
        body('email')
          .isEmail()
          .withMessage('Please enter a valid email.'),
          body('password').isLength({ min: 1 })
          .withMessage('Please enter a valid password.')
 
        ]



exports.signupValidator=  [
            body('email')
              .custom((value, { req }) => {
                return User.findOne({ email: value }).then(userDoc => {
                  if (userDoc) {
                    return Promise.reject('E-Mail address already exists!');
                  }
                });
              })
              ,
         
          ]
    
  exports.changePasswordValidator=[  query('userId')
  .custom((value, { req }) => {
    return User.findById(value).then(userDoc => {
      if (!userDoc) {
        formatError('User not found. Please SignUp First',422);
      }
      if (value !== req.userId ) {
     formatError('Operation Denied',422)
    }else{
      return true;
    }
  }) 
}),body('password').isLength({min:6}).withMessage('Please enter a valid password')
 ]

exports.changePrivilegeValidator=[ 
  query('userId').custom((value, { req }) => {
    return User.findById(value).then(userDoc => {
      if (!userDoc) {
        formatError('User not found',422);
      }
      if (req.privilege !== 'Admin' ) {
     formatError('Operation Denied',422)
    }else{
      return true;
    }
  }) 
}), body('privilege').custom((value, { req }) => {
  if (value !== "Admin")
  {
    if( value !== "Guest" ) {
   formatError('Invalid privilege input',422)
  }
}
else{
  return true;
}
})
]

exports.changeProfilePicture=[  query('userId')
.custom((value, { req }) => {
  return User.findById(value).then(userDoc => {
    if (!userDoc) {
      formatError('User not found. Please SignUp First',422);
    }

    if (value !== req.userId ) {
   formatError('Operation Denied',422)
  }else{
    return true;
  }
}) 
})
]

exports.getUsers=[  query('userId')
.custom((value, { req }) => {
  return User.findById(value).then(userDoc => {
    if (!userDoc) {
      formatError('User not found. Please SignUp First',422);
    }
    if (value !== req.userId && req.privilege !== 'Admin') {
   formatError('Operation Denied',422)
  }else{
    return true;
  }
}) 
})
]


