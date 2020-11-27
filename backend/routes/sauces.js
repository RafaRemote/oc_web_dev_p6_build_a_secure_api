const express =     require('express');                      
const router =      express.Router();                        
const saucesCtrl =  require('../controllers/sauce');         
const auth =        require('../middleware/auth');           
const multer =      require('../middleware/multer-config');  

// routes CRUD: Create, Read, Update, Delete
<<<<<<< HEAD
// routes: use auth to secure autentification
// routes: use controllers from sauce.js (saucesCtrl)
// routes: use multer, to manage the files (the images)
// routes: use authModify: n'autorise les modifications qu'aux auteurs des sauces (put & delete)
<<<<<<< HEAD

router.get('/',             auth,                       saucesCtrl.getAllSauce);                
router.post('/',            auth, multer,               saucesCtrl.createOneSauce);    
router.get('/:id',          auth,                       saucesCtrl.getOneSauce);             
router.put('/:id',          auth, multer,               saucesCtrl.modifyOneSauce);
router.delete('/:id',       auth,                       saucesCtrl.deleteOneSauce);
router.post('/:id/like',    auth,                       saucesCtrl.rateOneSauce);

// export the router
=======
// routes: auth pour l'autentification
// routes: multer pour gérer les fichiers images

router.get('/',             auth,           saucesCtrl.getAllSauce);                
router.post('/',            auth, multer,   saucesCtrl.createOneSauce);    
router.get('/:id',          auth,           saucesCtrl.getOneSauce);             
router.put('/:id',          auth, multer,   saucesCtrl.modifyOneSauce);
router.delete('/:id',       auth,           saucesCtrl.deleteOneSauce);
router.post('/:id/like',    auth,           saucesCtrl.rateOneSauce);

>>>>>>> experiment
module.exports = router;    
=======

router.get('/',             auth,                       saucesCtrl.getAllSauce);                
router.post('/',            auth, multer,               saucesCtrl.createOneSauce);    
router.get('/:id',          auth,                       saucesCtrl.getOneSauce);             
router.put('/:id',          auth, multer,               saucesCtrl.modifyOneSauce);
router.delete('/:id',       auth,                       saucesCtrl.deleteOneSauce);
router.post('/:id/like',    auth,                       saucesCtrl.likeOneSauce);

// export the router
module.exports = router;    
>>>>>>> newBranch
