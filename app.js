'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
module.exports = app; // for testing

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

var ModelAsignatura = require('./api/models/Asignatura');

app.get('/pruebas', (req, res) => {
  ModelAsignatura.find({}, (err, Asignatura) => {
      console.log(Asignatura);
      if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
      if(!Asignatura) return res.status(400).send({message: 'No existe ninguna Asignatura'});

      res.status(200).send({Asignatura});
  });
});