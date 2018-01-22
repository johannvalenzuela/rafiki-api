const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AsignaturaSchema = new Schema ({
    id: String, // Codigo de cada establecimiento
    nombre: String,
    descripcion: String,
    profesores:[], // puede tener mas de un profesor si el establecimiento lo ve necesario
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);