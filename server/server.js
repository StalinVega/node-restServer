const express = require('express');
const app = express();
const bodyParser = require('body-parser')
require('./config/config')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario',function(req,res){
    res.json("get Usuario");
});

app.post('/usuario',function(req,res){

    let body = req.body;
    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje:"el nombre es necesario"
        });
    }else{
    res.json({
        usuario: body
    });
}
});

app.put('/usuario/:id',function(req,res){ //dentro de la url voy a recibir un parametro
    let id= req.params.id
    res.json({
        id
    })
});

app.delete('/usuario',function(req,res){
    res.json("delete Usuario");
});

app.listen(process.env.PORT,()=>{
    console.log("Escuchando en el puerto", process.env.PORT);
});