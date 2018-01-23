'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

/************** Para conexión con la BD mongo ******************/
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// realizando conexion con la bd
mongoose.connect('mongodb://localhost/niveles', { useMongoClient: true });

/*
var peliculaSchemaJSON = {
    titulo: String,
    age: Number
 
};

// Creando Schema
var peliculaSchema = new Schema(peliculaSchemaJSON);

// Creando modelo
var Pelicula = mongoose.model("peliculas",peliculaSchema);
*/


/***************************************************************/

// CONEXIÓN A SERVIDOR LOCAL 
var http = require('http');
var server = http.createServer(app);
server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/users?name=Scott');
  }
});
