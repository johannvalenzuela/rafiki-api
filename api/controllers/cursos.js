var util = require('util');
var ModelCurso = require('../../api/models/curso');


/** 
 * Función para obtener un arreglo de cursos
 *
 * @author Samuel Carrasco Fuentes
 * @exports getCursos GET /cursos
 * @param req Petición HTTP
 * @param res | 200 Cursos | 404 No hay cursos | 500 Error al buscar |
 * @return {object} JSON con un objeto que contiene arreglo de Objetos Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCursos = (req, res) => {

  let Error = [];

  var query = {};


  if (req.query.nombre) {

    query["nombre"] = { $regex: req.query.nombre, $options: "i" };

  }

  if (req.query.salaCurso) {

    query["salaCurso"] = { $regex: req.query.salaCurso, $options: "i" };

  }


  if (req.query.nivel) {

    query["nivel"] = { $regex: req.query.nivel, $options: "i" };

  }

  if (req.query.detalles) {

    query["detalles"] = { $regex: req.query.detalles, $options: "i" };

  }

  if (req.query.profesores) {

    let arr = req.query.profesores.split(',');
    query["profesores"] = { $in: arr }

  }

  if (req.query.alumnos) {

    let arr = req.query.alumnos.split(',');
    query["alumnos"] = { $in: arr }

  }


  ModelCurso.find(query)
    .populate('nivel')
    .populate('profesores')
    .populate('alumnos')
    .populate('planificacion')
    .populate('planificacion.oa')
    .populate('planificacion.recursos')
    .exec(function (err, cursos) {

      console.log(cursos);

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })

        return res.status(400).json({ errors: Error })
      }

      return res.status(200).json({
        link: req.url,
        data: cursos,
        type: "cursos"
      });

    }
    );

}

/** 
 * Función para obtener un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports getCurso GET /cursos/{id}
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCurso = (req, res) => {

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso)
    .populate('nivel')
    .populate('profesores')
    .populate('alumnos')
    .exec(function (err, curso) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!curso) {

        Error.push({
          titulo: "El Curso no existe",
          detalle: "El id ingresado no corresponde a un curso",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {
        return res.status(200).json({
          link: req.url,
          data: [curso],
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
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
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
      return res.status(400).json({ errors: Error })
    }

    if (!curso) {

      Error.push({
        titulo: "El Curso no existe",
        detalle: "El id ingresado no corresponde a un curso",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
    }

    curso.remove(idCurso, function (err, curso) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      else
        return res.status(200).json({ link: req.url });
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
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
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
      return res.status(400).json({ errors: Error })
    }

    if (!curso) {

      Error.push({
        titulo: "El Curso no existe",
        detalle: "El id ingresado no corresponde a un curso",
        link: req.url,
        estado: "404"
      });
      return res.status(400).json({ errors: Error });
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
        return res.status(400).json({ errors: Error })
      }
      else
        return res.status(200).json({ link: req.url });
    });
  });
}

/** 
 * Función para insertar un curso.
 *
 * @author Samuel Carrasco Fuentes
 * @exports postcurso POST /cursos
 * @param req Petición HTTP, JSON con Objeto curso en Body
 * @param res | 201 Curso creado | 500 Error al buscar |
 * @return {req.url} JSON con link
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.postCurso = (req, res) => {

  let Error = [];

  if (!req.body.nombre) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'nombre'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.nivel) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'nivel'",
    link: req.url,
    estado: "417"
  });

  if (!req.body.profesores) Error.push({
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

  if (!req.body.alumnos) Error.push({
    titulo: "Solicitud Incompleta",
    detalle: "Se requiere el campo 'totalAlumnos'",
    link: req.url,
    estado: "417"
  });

  if (Error.length > 0) {
    return res.status(400).json({ errors: Error });
  }

  ModelCurso.create(req.body, function (err, curso) {

    if (err) {
      Error.push({
        titulo: "Solicitud incorrecta",
        detalle: "El valor de un atributo es incorrecto",
        link: req.url,
        estado: "404"
      })
      return res.status(400).json({ errors: Error })
    }

    curso.save(function (err) {

      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }
      else
        return res.status(201).json({ link: req.url });
    })
  });
}

/** 
 * Función para obtener un curso.
 *
 * @author Israel Jasma
 * @exports getCurso GET /cursos/{id}/nivel
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCursoNivel = (req, res) => {

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso)
    .populate('nivel')
    // .populate('profesores')
    // .populate('alumnos')
    .exec(function (err, curso) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!curso) {

        Error.push({
          titulo: "El Curso no existe",
          detalle: "El id ingresado no corresponde a un curso",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {
        return res.status(200).json({
          link: req.url,
          data: [curso.nivel],
          type: "cursos"
        });
      }
    });

}

/** 
 * Función para obtener un curso.
 *
 * @author Israel Jasma
 * @exports getCurso GET /cursos/{id}/profesores
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCursoProfesores = (req, res) => {

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso)
    // .populate('nivel')
    .populate('profesores')
    // .populate('alumnos')
    .exec(function (err, curso) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!curso) {

        Error.push({
          titulo: "El Curso no existe",
          detalle: "El id ingresado no corresponde a un curso",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {
        return res.status(200).json({
          link: req.url,
          data: [curso.profesores],
          type: "cursos"
        });
      }
    });

}

/** 
 * Función para obtener un curso.
 *
 * @author Israel Jasma
 * @exports getCurso GET /cursos/{id}/alumnos
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCursoAlumnos = (req, res) => {

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso)
    // .populate('nivel')
    // .populate('profesores')
    .populate('alumnos')
    .exec(function (err, curso) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!curso) {

        Error.push({
          titulo: "El Curso no existe",
          detalle: "El id ingresado no corresponde a un curso",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {
        return res.status(200).json({
          link: req.url,
          data: [curso.alumnos],
          type: "cursos"
        });
      }
    });

}

/** 
 * Función para obtener un curso.
 *
 * @author Israel Jasma
 * @exports getCurso GET /cursos/{id}/planificacion
 * @param req Petición HTTP, id de curso en path
 * @param res | 200 Curso encontrado | 404 Curso no existe | 500 Error al buscar |
 * @return {object} JSON con objeto Curso
 * @return {errors: Error } JSON con un objeto que contiene arreglo de Objetos Error
 */
exports.getCursoPlanificacion = (req, res) => {

  let Error = [];
  let idCurso = req.swagger.params.id.value

  ModelCurso.findById(idCurso)
    .populate('nivel')
    .populate('profesores')
    .populate('alumnos')
    .populate('planificacion')
    .populate('planificacion.oa')
    .populate('planificacion.recursos')
    .exec(function (err, curso) {
      if (err) {
        Error.push({
          titulo: "Error Interno en el Servidor",
          detalle: "Ocurrió algún error al realizar petición",
          link: req.url,
          estado: "500"
        })
        return res.status(400).json({ errors: Error })
      }

      if (!curso) {

        Error.push({
          titulo: "El Curso no existe",
          detalle: "El id ingresado no corresponde a un curso",
          link: req.url,
          estado: "404"
        });
        return res.status(400).json({ errors: Error });
      }
      else {
        return res.status(200).json({
          link: req.url,
          data: [curso.planificacion],
          type: "cursos"
        });
      }
    });

}