'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Users = mongoose.model('Users');
//var Curso = mongoose.model('Curso');

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
    sostenedor: [{
        type: Schema.Types.ObjectId, ref: 'Users'
    }],

    orientacionReligiosa: {
        type: String,
    },

    correos: [{
        type: String,
    }],

    telefonos: [{
        nombre: {
            type: String
        },
        numero: {
            type: String
        }
    }],

    web: {
        type: String,
    },

    director: [{
        type: Schema.Types.ObjectId, ref: 'Users'
    }],

    mensualidad: {
        type: Number,
        min: 0
    },

    puntajeSimce: {
        type: Number,
        min: 0
    },

    fechaPostulacion: {
        inicio: {
            type: Date
        },
        cierre: {
            type: Date
        }
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

    numVacantes: {
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

    cursos: [{
        type: Schema.Types.ObjectId, ref: 'Curso'
    }],

    profesores: [{
        type: Schema.Types.ObjectId, ref: 'Users'
    }],

    alumnos: [{
        type: Schema.Types.ObjectId, ref: 'Users'
    }],

    createAt: {
        type: Date,
        default: Date.now
    }, 
    
    //proyectosEducativos: Array,
    //nivelEnsenanza: [], // Media, Basica, PreKinder, etc

});

module.exports = mongoose.model('organizaciones', OrganizacionSchema);