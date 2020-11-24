const express =     require('express');                       // import framework Express
const router =      express.Router();                         // use method Router of the framework Express
const saucesCtrl =  require('../controllers/sauce');          // import controller sauce.js
const auth =        require('../middleware/auth');            // import middelware auth.js to secure the authentification
const multer =      require('../middleware/multer-config');   // import middleware multer-config.js to manage images

// routes CRUD: Create, Read, Update, Delete
// routes: use auth to secure autentification
// routes: use controllers from sauce.js (saucesCtrl)
// routes: use multer, to manage the files (the images)

router.get('/',             auth,           saucesCtrl.getAllSauce);                
router.post('/',            auth, multer,   saucesCtrl.createOneSauce);    
router.get('/:id',          auth,           saucesCtrl.getOneSauce);             
router.put('/:id',          auth, multer,   saucesCtrl.modifyOneSauce);
router.delete('/:id',       auth,           saucesCtrl.deleteOneSauce);
router.post('/:id/like',    auth,           saucesCtrl.likeOneSauce);



// export the router
module.exports = router;    
