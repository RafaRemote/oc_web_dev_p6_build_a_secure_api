const jwt = require('jsonwebtoken'); 

// authentification
module.exports = (req, res, next) => {
  try {                                                             
    const token = req.headers.authorization.split(' ')[1];          // on sépare le bearer et on ne garde que le token
    const decodedToken = jwt.verify(token, process.env.TOKEN);      // on vérifie (avec la méthode verify de jsonwebtoken) que le token, correspeond au secret (token) que l'on a dans process.env
    const userId = decodedToken.userId;                             
    if (req.body.userId && req.body.userId !== userId) {                        
      throw Error;                                                  
    } else {
      req.token = token;  
      req.user = userId;  // on ajoute l'id du user: cela servira à l'authentification pour les routes delete et put. 
      next();      
       
    }
  } catch {
    res.status(401).json({error:error});                            
  }
};