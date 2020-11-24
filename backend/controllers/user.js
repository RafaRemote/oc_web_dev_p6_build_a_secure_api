const bcrypt =  require('bcrypt');                                                    //import bcrypt: to hash passwords
const jwt =     require('jsonwebtoken');                                              //import jsonwebtolen: to manage the token (REST API: stateless)
const User =    require('../models/User');                                            //import mongoose model User

exports.signup = (req, res, next) => {                                                //
  bcrypt.hash(req.body.password, 10)                                                  //hash password includes in the request (req.body.password) async funtion, will take time, will return a prommise and so it will be followed by .then() and .catch(). Salt = 10 times, standart (number of hashing alogythm executions).
    .then(hash => {                                                                   //returns the hashed password: hash
      const user = new User({                                                         //first: create a new User (see the mongoose model User in directory "Models")
        email: req.body.email,                                                        //email of the new User: email included in the body request: req.body.email
        password: hash                                                                //password = the hash that bcrypt did just make for us and did just return as a promise
      });
      user.save()                                                                     //use save method to save the new user in the DataBase
        .then(() => res.status(201).json({ message: 'new user created' }))            // response status: 201 status code: created
        .catch(error => res.status(400).json({ error }));                             // response status: 400 status code: bad request
    })
    .catch(error => res.status(500).json({ error }));                                 // response status: 500 status code: internal server error
};


exports.login = (req, res, next) => {                                                 //
  User.findOne({ email: req.body.email })                                             //method findOne: from the model, find same user with this property req.body.email, as the user log in with his email
    .then(user => {                                                                   //use the returned promise
      if (!user) {                                                                    //if false
        return res.status(401).json({ message: 'user not found' });                   //returns status in the response: 401 code status: unathorized
      }
      bcrypt.compare(req.body.password, user.password)                                //else it's true: use compare bcrypt method: compare the password property's value from the request, to the passord's property value from the user found
        .then(valid => {                                                              //use the returned promise
          if (!valid) {                                                               //if false
            return res.status(404).json({ message: "incorrect password" });           //404 code status: not found
          }
          res.status(200).json({                                                      //else it's true: response status proprety's value is 200: 200 code status: ok.
            userId: user._id,                                                         //returns in the response: the user._id from the database
            token: jwt.sign(                                                          //use jsonwebtoken's method sign: paramaters: data to be encoded
            { userId: user._id },                                                     //first argument: userId
              process.env.TOKEN,                                                  //second argument: secret key for the encoding
              { expiresIn: '24h' }                                                    //configuration argument: expiration time
            )
          });
        })
        .catch(error => res.status(500).json({ error }));                               // 500 status code: internal server error                 
    })
    .catch(error => res.status(500).json({ error }));                                   // 500 status code: internal server error
};