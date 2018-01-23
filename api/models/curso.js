const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//mongoose.connect('mongodb://localhost/cursos');
//mongoose.connect('mongodb://Rafiki:%23Zeus2018@54.233.193.162:27017/cursos')

var username = 'Rafiki';
var password = encodeURIComponent('#Zeus2018');
var database = 'admin';
var port = '27017';
var host = '54.233.193.162';



mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');
});

const CursoSchema = new Schema ({

    idCurso: String, 
    nivel: String, 
    nombre: String,
    profesorJefe: String, 
    salaCurso: String, 
    totalAlumnos: Number
    //asignaturas: []
    //promAlumnosCurso: Number,
    //alumnos: [], 
   
});

module.exports = mongoose.model('Curso', CursoSchema);