var util = require('util');
var ModelCurso = require('../../api/models/curso');


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

  let Error = [];

  ModelCurso.find({}, (err, cursos) => {

    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.json({ errors: Error })
    }

    if (!cursos) {

      Error.push({
        titulo: "No existen Cursos",
        detalle: "La base de datos se encuentra sin cursos",
        link: req.url,
        estado: "404"
      });
      return res.json({ errors: Error });
    }
    else {
      return res.status(200).json({
        link: req.url,
        data: cursos,
        type: "cursos"
      });
    }



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

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso, (err, curso) => {

    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.json({ errors: Error })
    }

    if (!curso) {

      Error.push({
        titulo: "El Curso no existe",
        detalle: "El id ingresado no corresponde a un curso",
        link: req.url,
        estado: "404"
      });
      return res.json({ errors: Error });
    }
    else {
      return res.status(200).json({
        link: req.url,
        data: curso,
        type: "cursos"
      });
    }

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

  let Error = [];
  let idCurso = req.swagger.params.id.value;

  ModelCurso.findById(idCurso, (err, curso) => {

    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.json({ errors: Error })
    }

    if (!curso) {

      Error.push({
        titulo: "El Curso no existe",
        detalle: "El id ingresado no corresponde a un curso",
        link: req.url,
        estado: "404"
      });
      return res.json({ errors: Error });
    }

    curso.remove(idCurso, function (err, curso) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.json({ errors: Error })
      }
      else
        res.status(200).json({ link: req.url });
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

  let Error = [];
  let idCurso = req.swagger.params.id.value;


  ModelCurso.findById(idCurso, function (err, curso) {


    if (err) {
      Error.push({
        titulo: "Error Interno en el Servidor",
        detalle: "Ocurrió algún error al realizar petición",
        link: req.url,
        estado: "500"
      })
      return res.json({ errors: Error })
    }

    if (!curso) {

      Error.push({
        titulo: "El Curso no existe",
        detalle: "El id ingresado no corresponde a un curso",
        link: req.url,
        estado: "404"
      });
      return res.json({ errors: Error });
    }

    curso = Object.assign(curso, req.body);

    curso.save(idCurso, function (err, curso) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.json({ errors: Error })
      }
      else
        res.status(200).json({ link: req.url });
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

  let Error = [];

  if (!req.body.idCurso) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'idCurso'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.nivel) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'nivel'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.asignatura) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'asignatura'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.profesorJefe) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'profesorJefe'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.salaCurso) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'salaCurso'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.totalAlumnos) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'totalAlumnos'",
    link: req.url,
    estado: "417"
  });

  if (Error.length > 0) {
    return res.status(400).json({ errors: Error });
  }

  ModelCurso.create(req.body, function (err, curso) {

    curso.save(function (err) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.json({ errors: Error })
      }
      else
        res.status(201).json({ link: req.url });
    })
  });
}




