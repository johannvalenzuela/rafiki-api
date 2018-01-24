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
var ModelCurso = require('../../api/models/curso');

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
  getCursos: getCursos,
  getCursoId: getCursoId,
 // putCurso: putCurso,
  //deleteCurso: deleteCurso,
  //postCurso: postCurso

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getCursos(req, res) {
  ModelCurso.find({}, (err, curso) => {
    console.log(curso);
    if(err) return res.status(500).send({message: "Error al realizar peticion: ${err}"});
    if(!curso) return res.status(400).send({message: 'No existe ningún curso'});

    res.status(200).send({curso});
});
}



function getCursoId(req, res) {
  
  //let cursoId = req.params.id;

  let cursoId = req.swagger.params.id.value

  ModelCurso.findById(cursoId, (err, curso) => {
    if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
    if(!curso) return res.status(400).send({message: 'El curso no existe'});
    res.status(200).send({curso : curso});
    //console.log(curso);
  });
}
/*
//API REST: POST

function postCurso(req, res) {
  
  let curso = new Curso()

	curso.name = req.body.name
	curso.age = req.body.age

	ModelCurso.save((err, cursoGuardado) =>{

		if (err) return res.status(500).send({message: "Error al salvar la BD: ${err}"})

		res.status(200).send({curso: cursoGuardado})
	})
}

//API REST: DELETE

function deleteCurso(req, res) {

  let cursoId = req.params._id

	ModelCurso.findById(cursoID, (err, curso) => {

		if (err) return res.status(500).send({message: "Error al borrar curso: ${err}"})

		curso.remove(err =>{

			if(err) res.status(500).send({mesagge: "Error al borrar curso"})
			res.status(200).send({mesagge: "Curso eliminado"})
		})
	})
}

//API REST: PUT

function putCurso(req, res) {
  
  let cursoId = req.params._id
	let update = req.body

	ModelCurso.findByIdAndUpdate(cursoId, update, {new: true}, (err, cursoUpdated) => {

		if (err) return res.status(500).send({message: "Error al actual curso: ${err}"})

		res.status(200).send({ curso: cursoUpdated})
	})
}

*/
