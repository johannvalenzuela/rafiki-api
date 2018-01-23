'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizacionSchema = new Schema ({
    rbd: Number, // Codigo de cada establecimiento
    nombre: String,
    descripcion: String, 
    reconocimientoOficial: Date, // Fecha
    dependencia: String, // Subvencionado, Municipal, etc
    sostenedor: String, // Corporacion o Sociedad sostenedora
    orientacionReligiosa: String,
    direccion: {
        calle: String,
        region: String,
        comuna: String
    },
    correo: String,
    telefono: String,
    web: String,
    director: String,
    fechaPostulacion:{
        inicio: Date,
        cierre: Date
    },
    mensualidad: Number,
    totalAlumnosMatriculados: Number,
    promAlumnosCurso: Number,
    puntajeSimce: Number,
    proyectosEducativos:[],
    nivelEnsenanza: [], // Media, Basica, PreKinder, etc
    usuarios: [],
    cursos: []
});

module.exports = mongoose.model('Organizacion', OrganizacionSchema);