<<<<<<< HEAD
                        require('dotenv').config()          // load environment variables from the .env file into process.env
const express =         require('express');                 // import express: node.js web framework
const bodyParser =      require('body-parser');             // import body-parser: parse incoming request bodies in a middleware before handlers, available under the req.body property.
const mongoose =        require('mongoose');                // import mongoose: ODM, a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const helmet =          require('helmet');                  // import helmet: help to secure Express apps by setting various HTTP headers.
const path =            require('path');                    // import path: provides a way of working with directories and file paths. (line 44)
const cors =            require('cors');                    // import cors: manage cross-origin resource sharing
const rateLimit =       require('express-rate-limit');      // comme son nom l'indique: on va fixer un taux limite pour les requêtes.

<<<<<<< HEAD
//constante à utiliser avec le package rateLimit
=======
>>>>>>> newBranch
const limiter = rateLimit({         
  windowMs: 15 * 60 * 1000,       // = 15 minutes
  max: 100
})

<<<<<<< HEAD
// use express
const app = express();

// application du package
app.use(limiter);

// secure HTTP headers
app.use(helmet());

// setting the cross-scripting protection
=======
                        require('dotenv').config()          
const express =         require('express');                
const bodyParser =      require('body-parser');            
const mongoose =        require('mongoose');               
const helmet =          require('helmet');                 
const path =            require('path');                   
const cors =            require('cors');                   
const rateLimit =       require('express-rate-limit');      // comme son nom l'indique: on va fixer un taux limite pour les requêtes.

// utilisation du package rateLimit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 min
  max: 100                    // 100 connexions max
})

// on importe les routes situées dans deux dossiers différents: sauces et user
const saucesRoutes =    require('./routes/sauces');          
const userRoutes =      require('./routes/user');

=======
// Use express
>>>>>>> newBranch
const app = express();

// utilisation de express-rate-limit
app.use(limiter);

// sécuristaion des headers
app.use(helmet());

// cross-scripting protection (helmet)
>>>>>>> experiment
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// sécurisation cors: origin localhost:4200
app.use(cors({origin: 'http://localhost:4200'}));

// pour se connecter, mongoose va aller chercher le code dans le fichie .env
mongoose.connect(process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
  .then(() => console.log('connected to the database!'))
<<<<<<< HEAD
  .catch((error) => console.log(error));
=======
  .catch((error) => console.log(new error));
>>>>>>> experiment

// manage cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();
});

<<<<<<< HEAD
// parsing all incoming requests
app.use(bodyParser.json());

// images management
app.use('/images', express.static(path.join(__dirname, 'images')));

<<<<<<< HEAD
=======

>>>>>>> newBranch
// import the routes for user and sauces from directory "routes"
const saucesRoutes =    require('./routes/sauces');          
const userRoutes =      require('./routes/user');

// API routes 
=======
// analyse des json
app.use(bodyParser.json());

// emplacement des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes api
>>>>>>> experiment
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// make app available for the otther files
module.exports = app;