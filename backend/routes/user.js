const bodyParser = require('body-parser');
<<<<<<< HEAD
const express =     require('express');                     //import the framework Express
const userCtrl =    require('../controllers/user');         //import the controller user.js
const router =      express.Router();                       //use the the express's method Router()
const {body, validationResult} = require('express-validator'); //use express-validator to build a 'sanitize' function

=======
const express =     require('express');                     
const userCtrl =    require('../controllers/user');         
const router =      express.Router();                       
const {body, validationResult} = require('express-validator');  // on importe le package express-validator
>>>>>>> experiment

// cette fonction servira à express-validator
const sanitize = (req, res, next) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error})  // code 400: bad request
=======
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors})  
>>>>>>> experiment
=======
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({error})  // code 400: bad request
>>>>>>> newBranch
    }
    next();      // si on ne trouve pas d'erreur par rapport à ce qu'on a demandé, on passe à la suite.
};

// la route pour se connecter, on précise l'uri (en utilisant les controllers dans le dossier contollers)
router.post('/signup', [
    body('email').isEmail(),                // ici, on utilise express-validator et on précise ce qu'on veut []
    body('password').isLength({min: 5})
    ], sanitize,                            // on vérifie avec la fonction créée plus haut si on a bien ce qu'on a demandé
    userCtrl.signup);   

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({min: 5})
    ], sanitize, 
    userCtrl.login);

module.exports = router;