const http =  require('http');      
const app =   require('./app');     

// Optimisation de server.js
// normalizePort renvoi un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);   //analyse de l'argument passé, valeur obtenue assigné à une constante "port"

  if (isNaN(port)) {    // si la constante "port" n'est pas un Nombre (isNaN) 
    return val;         // renvoie de l'argument qui passé à la fonction
  }
  if (port >= 0) {
    return port;       // si la valeur de la constante "port" est supérieur à zéro de donc valide: la fonction renvoie la consante port
  }
  return false;       // sinon (port<0) la fonction renvoie alors false
};
const port = normalizePort(process.env.PORT || '8080');   //si process.env.PORT n'est pas disponible alors on se sert du port 8080
app.set('port', port);

// management des erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':              // EACCES :  permission denied
      console.error(error);
      process.exit(1);
      break;
    case 'EADDRINUSE':        //EADDRINUSE: port already in use
      console.error(error);
      process.exit(1);
      break;
    default: 
      throw error;
  }
};

const server = http.createServer(app);

server.on(new Error(), errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening!');
});

server.listen(port);