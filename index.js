const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const mongoose = require('mongoose');

var ModelOrganizacion = require('./api/models/organizacion');

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

// Coneccion con mongoose
mongoose.connect('mongodb://localhost:27017/rafiki', (err, res) => {
    if(err) {
        return console.log(`Error al conectarse a la BD: ${err}`);
    }
    console.log('Conexion con la BD OK...!');

    
    app.listen(port,() =>{
        console.log('Servidor iniciado en el puerto 3000');
    });
});

// ruta de la pagina HOME
app.get('/', (req, res) => res.send('Hello World!'));

// ruta de la pagina usuario  (Buscar Todos)
app.get('/organizacion', (req, res) => {
    ModelOrganizacion.find({}, (err, organizacion) => {
        console.log(organizacion);
    	if(err) return res.status(500).send({message: `Error al realizar peticion: ${err}`});
    	if(!organizacion) return res.status(400).send({message: 'No existe ninguna organizacion'});

    	res.status(200).send({organizacion});
    });
});
