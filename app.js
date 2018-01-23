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
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/hello?name=Scott');
  }
  if (swaggerExpress.runner.swagger.paths['/users']) {
    console.log('try this:\ncurl http://127.0.0.1/:' + port + '/users?name=Scott');
  }
});
var ModelNivel = require('./api/models/nivel');

app.get('/niveles', (req, res) => {
  ModelNivel.find({}, (err, nivel) => {
      console.log();
      if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
      if(!nivel) return res.status(400).send({message: 'No existe ningún nivel'});

      res.status(200).send({nivel});
      console.log(nivel);
  });
});


