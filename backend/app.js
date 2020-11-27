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

const app = express();

// utilisation de express-rate-limit
app.use(limiter);

// sécuristaion des headers
app.use(helmet());

// cross-scripting protection (helmet)
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
  .catch((error) => console.log(new error));

// manage cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
  next();
});

// analyse des json
app.use(bodyParser.json());

// emplacement des images
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes api
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// make app available for the otther files
module.exports = app;