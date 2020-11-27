                        require('dotenv').config()          // load environment variables from the .env file into process.env
const express =         require('express');                 // import express: node.js web framework
const bodyParser =      require('body-parser');             // import body-parser: parse incoming request bodies in a middleware before handlers, available under the req.body property.
const mongoose =        require('mongoose');                // import mongoose: ODM, a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.
const helmet =          require('helmet');                  // import helmet: help to secure Express apps by setting various HTTP headers.
const path =            require('path');                    // import path: provides a way of working with directories and file paths. (line 44)
const cors =            require('cors');                    // import cors: manage cross-origin resource sharing
const rateLimit =       require('express-rate-limit');      // comme son nom l'indique: on va fixer un taux limite pour les requêtes.

const limiter = rateLimit({         
  windowMs: 15 * 60 * 1000,       // = 15 minutes
  max: 100
})

// Use express
const app = express();

app.use(limiter);

// Secure HTTP headers
app.use(helmet());

//setting the cross-scripting protection
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Secure cors: authorization for origin: localhost:4200
app.use(cors({origin: 'http://localhost:4200'}));

// use mongoose to connect to the mongodb database. Use process.env to import the variables from file .env
mongoose.connect(process.env.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to the database!'))
  .catch((error) => console.log(error));


// manage cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow access from all origins requests(*)
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //available requests methods
  next();
});

// Parsing all incoming requests
app.use(bodyParser.json());

// Images management
app.use('/images', express.static(path.join(__dirname, 'images')));


// import the routes for user and sauces from directory "routes"
const saucesRoutes =    require('./routes/sauces');          
const userRoutes =      require('./routes/user');

// API routes 
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// make app available for the otther files
module.exports = app;