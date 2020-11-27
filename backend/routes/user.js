const bodyParser = require('body-parser');
const express =     require('express');                     //import the framework Express
const userCtrl =    require('../controllers/user');         //import the controller user.js
const router =      express.Router();                       //use the the express's method Router()
const {body, validationResult} = require('express-validator'); //use express-validator to build a 'sanitize' function


const sanitize = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error})  // code 400: bad request
    }
    next();
}

//routes for user signup and login: will use the contollers function in user.js from the controllers directory
router.post('/signup', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
    ], sanitize,  
    userCtrl.signup);   

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
    ], sanitize, 
    userCtrl.login);

//export router
module.exports = router;