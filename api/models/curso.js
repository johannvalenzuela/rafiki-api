const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema ({
    idCurso: String, 
    nombre: String,
    profesorJefe: String, 
    salaCurso: String, 
    totalAlumnos: Number,
    asignaturas: [],
    promAlumnosCurso: Number,
    alumnos: [], 
   
});

module.exports = mongoose.model('Curso', OrganizacionSchema);