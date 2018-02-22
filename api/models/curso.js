const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CursoSchema = new Schema({

    nombre: {
        type: String
    },

    salaCurso: {
        type: String
    },

    nivel: {
        type: Schema.Types.ObjectId, ref: 'niveles'
    },

    detalles: {
        type: String
    },

    planificacion: {
        type: [{

            oa: {
                type: Schema.Types.ObjectId, ref: 'objaprendizajes'
            }, 

            fecha: {
                type: Date,
                default: Date.now
            },

            detalles: {
                type: String
            },

            recursos: {
                type: [{
                    type: Schema.Types.ObjectId, ref: 'RecursoEducativo'
                }]
            }
        }]
    },

    profesores: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Users'    
        }]
    },

    alumnos: {
        type: [{
            type: Schema.Types.ObjectId, ref: 'Users'
        }]
    },

    //Fecha de creación
    createAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Curso', CursoSchema);