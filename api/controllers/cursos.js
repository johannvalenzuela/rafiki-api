var util = require('util');
var ModelCurso = require('../../api/models/curso');
const Responses = require('../helpers/responses');


/** 
 * Función para obtener un arreglo de cursos
 *
 * @author Samuel Carrasco Fuentes
 * @exports getCursos GET /cursos
 * @param req Petición HTTP
 * @param res | 200 Cursos | 404 No hay cursos | 500 Error al buscar |
 * @return {[cursos]} JSON con un objeto que contiene arreglo de Objetos Curso
 */
exports.getCursos = (req, res) => {

  ModelCurso.find({}, (err, cursos) => {

    if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });

    if (!cursos) return res.status(404).send({ message: 'No existe ningún curso' });

    res.status(200).send({ cursos });
  });
}

/** 
 * Función para obtener un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getCurso GET /cursos/{id}
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {curso: curso} JSON con un Objeto Curso
 */
exports.getCurso = (req, res) => {

  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso, (err, curso) => {

    if (err) return res.status(500).send({ message: `Error al realizar peticion: ${err}` });

    if (!curso) return res.status(404).send({ message: 'El curso no existe' });

    res.status(200).send({ curso: curso });

  });
}

/** 
 * Función para eliminar un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports deleteCurso DELETE /cursos/{id}
 * @param req Petición HTTP, id de curso en Path
 * @param res | 200 curso eliminado | 500 Error al buscar | 404 El curso no existe |
 * @return {message:mensaje} JSON con mensaje
 */
exports.deleteCurso = (req, res) => {

  let idCurso = req.swagger.params.id.value;

  ModelCurso.findById(idCurso, (err, curso) => {

    if (err) return res.status(500).json({ message: `Error al borrar el curso. Error: ${err}` });

    if (!curso) {
      res.status(404).send(Responses.getError({ message: `El curso de ID ${idCurso} no existe` }));
      return;
    }

    curso.remove(idCurso, function (err, curso) {
      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }

      res.status(200).json(Responses.getSuccess({ message: `El curso ${idCurso} ha sido eliminado` }));
    });
  });
}

/** 
 * Función para actualizar un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports updateCurso PUT /cursos/{id}
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Evaluación no existe | 500 Error al buscar |
 * @return {curso} JSON con Objeto Curso
 */
exports.updateCurso = (req, res) => {


  let idCurso = req.swagger.params.id.value;


  ModelCurso.findById(idCurso, function (err, curso) {


    if (err) {
      res.status(500).send(Responses.getError({ message: err.message }));
      return;
    }

    if (!curso) {
      res.status(404).send(Responses.getError({ message: `El Curso ${idCurso} no existe` }));
      return;
    }

    curso = Object.assign(curso, req.body);

    curso.save(idCurso, function (err, curso) {

      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }

      res.json(curso);
    });
  });
}

/** 
 * Función para insertar un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports postcurso POST /cursos
 * @param req Petición HTTP, JSON con Objeto curso en Body
 * @param res | 200 Curso creado | 500 Error al buscar |
 * @return {curso} JSON con Objeto Curso
 */
exports.postCurso = (req, res) => {

  ModelCurso.create(req.body, function (err, curso) {

    curso.save(function (err) {

      if (err) {
        res.status(500).send(Responses.getError({ message: err.message }));
        return;
      }

      res.status(200).json(curso);
    })
  });
}




