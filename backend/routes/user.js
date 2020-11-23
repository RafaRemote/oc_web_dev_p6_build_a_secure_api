const express =     require('express');                     //import the framework Express
const userCtrl =    require('../controllers/user');         //import the controller user.js

const router =      express.Router();                       //use the the express's method Router()

//routes for user signup and login: will use the contollers function in user.js from the controllers directory
router.post('/signup',  userCtrl.signup);   
router.post('/login',   userCtrl.login);

//export router
module.exports = router;