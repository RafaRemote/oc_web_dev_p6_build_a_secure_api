const express =     require('express');                      
const router =      express.Router();                        
const saucesCtrl =  require('../controllers/sauce');         
const auth =        require('../middleware/auth');           
const multer =      require('../middleware/multer-config');  

// routes CRUD: Create, Read, Update, Delete
// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images

router.get('/',             auth,           saucesCtrl.getAllSauce);                
router.post('/',            auth, multer,   saucesCtrl.createOneSauce);    
router.get('/:id',          auth,           saucesCtrl.getOneSauce);             
router.put('/:id',          auth, multer,   saucesCtrl.modifyOneSauce);
router.delete('/:id',       auth,           saucesCtrl.deleteOneSauce);
router.post('/:id/like',    auth,           saucesCtrl.rateOneSauce);

module.exports = router;    