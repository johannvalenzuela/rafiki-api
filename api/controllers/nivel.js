'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var ModelNivel = require('../../api/models/nivel');
const Responses = require('../helpers/responses');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  get_sigla: get_sigla,
  get_niveles: get_niveles,
  getNivelId: getNivelId,
  postNivel: postNivel

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function get_sigla(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var nivel = req.swagger.params.sigla.value;
  

  // this sends back a JSON response which is a single string
  res.json('Sigla Nivel académico: ' + nivel);
}
function get_niveles (req, res){
  ModelNivel.find({}, (err, nivel) => {
      if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
      if(!nivel) return res.status(400).send({message: 'No existe ningún nivel'});

      res.json(nivel)
      //res.status(200).send({nivel}); esto da error!!
      console.log(nivel);
  });

}

function getNivelId(req, res) {
  
  //let cursoId = req.params.id;

  let nivelId = req.swagger.params.id.value

  ModelNivel.findById(nivelId, (err, nivel) => {
    if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    if(!nivel) return res.status(400).send({message: 'El nivel no existe'});
    res.status(200).send({nivel});

    console.log(nivel);
  });
}

function postNivel(req, res) {
  
  let nivel = new Nivel()
	nivel.sigla = req.body.sigla
  nivel.tipo_nivel = req.body.tipo_nivel
  nivel.grado = req.body.grado
  nivel.descripcion = req.body.descripcion
  nivel.decreto = req.body.decreto

	ModelNivel.save((err, nivelGuardado) =>{
		if (err) return res.status(500).send({message: "Error al salvar la BD: ${err}"})
		res.status(200).send({nivel: nivelGuardado})
	});
}

