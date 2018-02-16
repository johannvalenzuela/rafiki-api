'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizacionSchema = new Schema({
    nombre: {
        type: String,
    },

    // Rol BD de cada establecimiento
    rbd: {
        type: Number,
        min: 0
    },

    descripcion: {
        type: String,
    },

    // Fecha
    reconocimientoOficial: {
        type: String,
    },

    // Subvencionado, Municipal, etc
    dependencia: {
        type: String,
    },

    // Corporacion o Sociedad sostenedora
    sostenedor: {
        type: String,
    },

    orientacionReligiosa: {
        type: String,
    },


    direccion: {
        calle: {
            type: String
        },
        region: {
            type: String
        },
        comuna: {
            type: String
        }
    },

    orientacionReligiosa: {
        type: String,
    },

    correo: {
        type: String,
    },

    telefono: {
        type: String,
    },

    web: {
        type: String,
    },

    director: {
        type: String,
    },

    numVacantes: {
        type: Number,
        min: 0
    },

    fechaPostulacion: {
        inicio: {
            type: String
        },
        cierre: {
            type: String
        }
    },

    mensualidad: {
        type: Number,
        min: 0
    },

    totalAlumnosMatriculados: {
        type: Number,
        min: 0
    },

    promAlumnosCurso: {
        type: Number,
        min: 0
    },

    puntajeSimce: {
        type: Number,
        min: 0
    },
    //proyectosEducativos: Array,
    //nivelEnsenanza: [], // Media, Basica, PreKinder, etc
    //usuarios: [],
    //cursos: []
});

module.exports = mongoose.model('organizaciones', OrganizacionSchema);