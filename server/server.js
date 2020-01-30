const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('./config/config')
require('./config/config')
const mongoose = require('mongoose');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//llamo a usuario para poder utilizar todas sus funciones
app.use(require('./routes/usuario'));
app.use(require('./routes/categorias'))
app.use(require('./routes/productos'))
//conexion a la base ded datos

mongoose.connect('mongodb://localhost:27017/cafe',(err,res)=>{
    if(err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT,()=>{
    console.log("Escuchando en el puerto", process.env.PORT);
});