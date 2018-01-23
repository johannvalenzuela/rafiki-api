'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// realizando conexion con la bd
mongoose.connect('mongodb://localhost/pruebas');

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


// app.get('/pruebas', (req, res) => {
//     ModelOrganizacion.find({}, (err, organizacion) => {
//         console.log(organizacion);
//         if(err) return res.status(500).send({message: 'Error al realizar peticion: ${err}'});
//         if(!organizacion) return res.status(400).send({message: 'No existe ninguna organizacion'});

//         res.status(200).send({organizacion});
//     });
// });