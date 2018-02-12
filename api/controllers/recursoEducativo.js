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
var ModelRecursoEducativo = require('../../api/models/recursoEducativo');
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
    getRecursosEducativos: getRecursosEducativos,
    getRecursoEducativoId: getRecursoEducativoId,
    updateRecursoEducativo: updateRecursoEducativo,
    deleteRecursoEducativo: deleteRecursoEducativo,
    postRecursoEducativo: postRecursoEducativo,

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */

//API REST: GET (Muestra Todos los Recursos Educativos)

function getRecursosEducativos(req, res) {

    /**Se buscan todos los Recursos Educativos */
    ModelRecursoEducativo.find({}, (err, recursosEducativos) => {

        /**En caso de error del servidor, se retorna error 500*/
        if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });

        /**En caso que los recursos educativos no se encuentren, se retorna un error 404*/
        if (!recursosEducativos) return res.status(404).send({ message: 'No existe ningún Recurso Educativo' });

        /**Se responde todos los recursos educativos*/
        console.log(recursosEducativos);
        res.status(200).send({ recursosEducativos });
    });
}


//API REST: GET (Muestra un Recurso Educativo según Id)

function getRecursoEducativoId(req, res) {

    /**Se recibe y guarda el id del Recurso Educativo */
    let recursoEducativoId = req.swagger.params.id.value

    /**Se busca el Recurso Educativo mediante id */
    ModelRecursoEducativo.findById(recursoEducativoId, (err, recursoEducativo) => {

        /**En caso de error del servidor, se retorna error 500*/
        if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });

        /**En caso que el Recurso Educativo no se encuentre, se retorna un error 404*/
        if (!recursoEducativo) return res.status(404).send({ message: 'El Recurso Educativo no existe' });

        /**Se responde el Recurso Educativo según id */
        res.status(200).send({ recursoEducativo: recursoEducativo });

    });
}



//API REST: DELETE (Elimina un Recurso Educativo según Id)

function deleteRecursoEducativo(request, response) {

    /**Se recibe y guarda el id del Recurso Educativo */
    let idRecursoEducativo = request.swagger.params.id.value;



    /**Se busca el Recurso Educativo mediante id */
    ModelRecursoEducativo.findById(idRecursoEducativo, (err, recursoEducativo) => {

        /**En caso de error del servidor, se retorna error 500*/
        if (err) return response.status(500).json({ message: `Error al borrar el Recurso Educativo - Error: ${err}` });

        /**En caso que el Recurso Educativo no se encuentre, se retorna un error 404*/
        if (!recursoEducativo) {
            response.status(404).send(Responses.getError({ message: `El Recurso Educativo de ID ${idRecursoEducativo} no existe` }));
            return;
        }

        /**Se elimina el Recurso Educativo */
        recursoEducativo.remove(idRecursoEducativo, function (err, recursoEducativo) {
            if (err) {
                response.status(500).send(Responses.getError({ message: err.message }));
                return;
            }
            response.status(200).json(Responses.getSuccess({ message: `El Recurso Educativo ${idRecursoEducativo} ha sido eliminado` }));
        });
    });
}

//API REST: PUT (Actualiza un Recurso Educativo según Id)

function updateRecursoEducativo(request, response) {

    /**Se recibe y guarda el id del Recurso Educativo */
    let idRecursoEducativo = request.swagger.params.id.value;

    /**Se busca el Recurso Educativo mediante id */
    ModelRecursoEducativo.findById(idRecursoEducativo, function (err, recursoEducativo) {

        /**En caso de error del servidor, se retorna error 500*/
        if (err) {
            response.status(500).send(Responses.getError({ message: err.message }));
            return;
        }

        /**En caso que el Recurso Educativo no se encuentre, se retorna un error 404*/
        if (!recursoEducativo) {
            response.status(404).send(Responses.getError({ message: `El Recurso Educativo ${idRecursoEducativo} no existe` }));
            return;
        }

        /**Se copian los valores a el Recurso Educativo */
        recursoEducativo = Object.assign(recursoEducativo, request.body);

        /**Se guardan los nuevos valores del Recurso Educativo */
        recursoEducativo.save(idRecursoEducativo, function (err, recursoEducativo) {

            if (err) {
                response.status(500).send(Responses.getError({ message: err.message }));
                return;
            }

            /**Se responde json con el contenido actualizado del Recurso Educativo */
            response.json(recursoEducativo);
        });
    });
}

//API REST: POST (Inserta un nuevo Recurso Educativo)

function postRecursoEducativo(request, response) {

    /**Se crea un nuevo Recurso Educativo */
    ModelRecursoEducativo.create(request.body, function (err, recursoEducativo) {

        /**En caso de error del servidor, se retorna error 500*/
        if (err) {
            response.status(404).send(Responses.getError({ message: err.message }));
            return;
        }

        /**Se guarda el nuevo Recurso Educativo */
        recursoEducativo.save(function (err) {

            /**En caso de error del servidor, se retorna error 500*/
            if (err) {
                response.status(500).send(Responses.getError({ message: err.message }));
                return;
            }

            /**Se responde un json con el contenido del Recurso Educativo*/

            response.status(200).json(recursoEducativo);


        })
    });
}





