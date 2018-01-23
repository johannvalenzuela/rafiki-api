'use strict'

/************** Para conexión con la BD mongo ******************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// realizando conexion con la bd
//mongoose.connect('mongodb://localhost/niveles'); // CONEXIÓN LOCAL 


//mongoose.connect('mongodb://Rafiki:#Zeus2018@54.233.193.162/niveles');

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


const NivelSchema = Schema({
    sigla: String, 
    tipo_nivel: String,
    grado: String,
    descripcion: String,
    decreto: String
 
})

module.exports = mongoose.model('niveles', NivelSchema)
