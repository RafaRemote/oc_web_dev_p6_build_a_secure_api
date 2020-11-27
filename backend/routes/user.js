const bodyParser = require('body-parser');
const express =     require('express');                     
const userCtrl =    require('../controllers/user');         
const router =      express.Router();                       
const {body, validationResult} = require('express-validator');  // on importe le package express-validator

// cette fonction servira à express-validator
const sanitize = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors})  
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