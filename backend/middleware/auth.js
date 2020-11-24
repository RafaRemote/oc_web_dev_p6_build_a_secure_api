const jwt = require('jsonwebtoken');  //import package jsonwebtoken: to manage the tokens (tokens use for REST API: stateless, no sessions at the server side)


module.exports = (req, res, next) => {
  try {                                                             //use try/catch to manage the errors, because multiple can go wrong in these lignes of codes
    const token = req.headers.authorization.split(' ')[1];          //get rid of the word "bearer"
    const decodedToken = jwt.verify(token, process.env.TOKEN);      //decode the token with jsonwebtoken method: verify: 2 parameters: the token and the secret key. if error, it will be returned in the catch, else return a js object, so we can manipulate it.
    const userId = decodedToken.userId;                             //now we hade the decoded token, it's now a js object, we extract the userId from it
    if (req.body.userId && req.body.userId !== userId) {            //if userId from the request is true (exists) AND userId is different from the the userId we found, then ...
      throw 'Invalid user ID';                                      //invalid userId
    } else {
      next();                                                       //else: all is ok, move to the next
    }
  } catch {
    res.status(401).json({                                           // 401 status code: unauthorized
      error:error | "unauthentified request"
    });
  }
};