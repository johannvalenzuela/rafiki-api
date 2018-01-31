'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActividadSchema = new Schema ({
    
    profesorAutor: String, 
    anhoAcademico: Number,
    semestre: Number,
    nivelDificultad: String,
    nivelAprendizaje: String, //Según taxonomia de bloom: Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear.
    tipoPregunta: String, //Enumeración, Conocimiento especifico, Ensayo.
    asignatura: String,
    tema: String,
    subTema: String,
    pregunta: String,
    respuestaReferencia: String,
    puntajeTotal: Number,
    retroalimentacion: Array //Enlaces de interes y/o información complementaria. Se entrega solo en preguntas de Ensayo.

   
});

module.exports = mongoose.model('Actividad', ActividadSchema);