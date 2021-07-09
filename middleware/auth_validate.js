
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  
  let formatError=(errmsg,errcode)=>
  {
    const error = new Error(errmsg);
    error.statusCode = errcode;
    throw error;
  }

  try {
   
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    formatError('Not authenticated',401)
  }
  const token = authHeader.split(' ')[0];
  let decodedToken;
    decodedToken = jwt.verify(token, 'create_safest_token_in_the_world');

    if (!decodedToken) {
      formatError('Not authenticated',401)
  }

    if(decodedToken.errors)
    {
      formatError('Invalid or expired Authentication Token',406)
    }

    req.userId = decodedToken.userId;
    req.privilege=decodedToken.privilege;
    next();
  
  } catch (err) {
   next(err)
  }
  

};
