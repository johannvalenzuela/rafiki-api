'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// realizando conexion con la bd
var username = 'Rafiki';
var password = encodeURIComponent('#Zeus2018');
var database = 'admin';
var port = '27017';
var host = '54.233.193.162';


// Añadir conexion con MongoDB aqui
mongoose.connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');
});

const AsignaturaSchema = new Schema ({
    //id: String, // Codigo de cada establecimiento
    nombre: String,
    enfasis: [],
    //descripcion: String,
    horasPedagogicasConJecAnual: Number,
    horasPedagogicasSinJecAnual: Number,
    horasPedagogicasConJecSemanal: Number,
    horasPedagogicasSinJecSemanal: Number,
    //profesores:[], // puede tener mas de un profesor si el establecimiento lo ve necesario
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);