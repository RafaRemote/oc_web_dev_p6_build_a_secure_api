const Sauce =     require('../models/Sauce');   //import mongoose model: Sauce
const fs =        require('fs');                //import fs:  allow to access to file-systems, will be used to delete the image from the directory "images"


exports.createOneSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then( () => {
      res.status(201).json({message: 'object created'}); 
    })
    .catch((error) => {
      res.status(400).json({error: error})});
    };

exports.modifyOneSauce = (req, res, next) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'object modified' }))
  .catch(error => res.status(400).json({ error }));
};
    
exports.deleteOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
  .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'La sauce a été supprimée.' }))
      .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};
    
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => { res.status(200).json(sauce);})
    .catch((error) => {res.status(404).json({error: error});
  });
}
        
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {res.status(200).json(sauces);})
    .catch((error) => {res.status(400).json({error: error});
  });
}


exports.likeOneSauce = (req, res, _) => {
  switch (req.body.like) {
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId }
              //_id: req.params.id
            })
              .then(() => { res.status(201).json({ message: "vote counted"}); })
              .catch((error) => { res.status(400).json({ error: error }); });

          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId }
             // _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: "vote counted" }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId }
        //_id: req.params.id
      })
        .then(() => { res.status(201).json({ message: "vote counted" }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId }
        //_id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'vote counted' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    default:
      console.error('bad request');
  }
};