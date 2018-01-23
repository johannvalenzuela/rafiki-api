'use strict';

// const bodyParser = require('body-parser');
// const path = require('path');

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
// const model = require('./api/models/organizacion');


// var organizacionSchema = new Schema(model);
// var Organizacion = mongoose.model("Organizacion",organizacionSchema);


var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

// app.use(bodyParser.urlencoded({extended: false }));
// app.use(bodyParser.json());

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

// // ruta de la pagina HOME
// app.get('/', (req, res) => res.send('Hello World!'));

// // Coneccion con mongoose
// mongoose.connect('mongodb://localhost/rafiki', { useMongoClient: true })
