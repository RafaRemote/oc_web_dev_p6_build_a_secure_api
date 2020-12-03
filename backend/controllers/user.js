// solution originale
// require('dotenv').config()
const bcrypt =  require('bcrypt');   // pour hasher le mot de passe                                                 
const jwt =     require('jsonwebtoken');                                             
const User =    require('../models/User');
const Maskata = require('maskdata');
const MaskData = require('maskdata');


// fonction d'encodage qui servira à l'email

// function maskator(sentence) {
//   if (typeof sentence === "string") {
//     let headMail = sentence.slice(0,1);
//     let bodyMail = sentence.slice(1, sentence.length-4);
//     let bottomMail = sentence.slice(sentence.length-4, sentence.length);
//     let final = [];
//     var masked = bodyMail.split('');
//     var maskedMail = [];
//     for(let i in masked) {
//       masked[i] = '*';
//       maskedMail += masked[i];  
//     }
//     final += headMail + maskedMail + bottomMail
//     return final;
//   }
//   console.log(sentence + " is not a mail");
//   return false
// }



// inscription d'un utilisateur
exports.signup = (req, res, next) => {                   
  bcrypt.hash(req.body.password, 10)    // on hashe le mot de passe avec un salt de 10                                               
    .then(hash => {                                                         
      const user = new User({                                                         
        email: MaskData.maskEmail2(req.body.email),  // on sauve un mail encodé
        password: hash                  // et on assigne le hash obtenu comme valeur de la propriété password de l'objet user 
    });
   console.log(user)
    user.save()                       // et on sauve tout ça dans la base de données                                            
      .then(() => res.status(201).json({ message: 'new user created' }))            
      .catch(error => res.status(400).json({ error }));                             
  })
  .catch(error => res.status(500).json({ error }));                                 
};

// connexion de l'utilisateur
exports.login = (req, res, next) => {                                                 
  User.findOne({ email: MaskData.maskEmail2(req.body.email)}) // on recherche l'équivalent du mail encodé
    .then(user => {           // on recherche une objet de modèle User, ayant pour propriété "email" avec la même valeur que req.body.email                                                                                                    
      if (!user) {   // pas trouvé ? = message: user not found                                                                  
        return res.status(401).json({ message: 'user not found' }); 
      }
      bcrypt.compare(req.body.password, user.password)       // si on trouve, on prend le password et avec bcrypt on compare le passord and le requête avec le password du user trouvé dans la base de données                       
        .then(valid => {    
          if (!valid) {     // si le password n'est pas validé = message: incorrect password                                         
            return res.status(404).json({ message: "incorrect password" });           
          } // et si c'est valide....
          res.status(200).json({                                                      
            userId: user._id,        // dans la réponse on renvoir le user._id (ce _id est donc l'id généré dans mongoDB)
            token: jwt.sign(         // et on renvoie un token d'authentification
            { userId: user._id },                                                     
              process.env.TOKEN,                                                      
              { expiresIn: '24h' }   // avec une date d'expiration      
            )
          });
        })
        .catch(error => res.status(500).json({ error }));                             
    })
    .catch(error => res.status(500).json({ error }));                                 
};
