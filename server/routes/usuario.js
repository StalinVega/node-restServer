const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const _= require('underscore');


// esta ruta con metodo get donde le digo al servidor que quiero mostrar algo
app.get('/usuario',function(req,res){
let desde = req.query.desde | 0;
desde = Number(desde);
let limite = req.query.limite | 5;
limite = Number(limite);
    
    Usuario.find({},'nombre email google img')  //me permite manejar o enviar un filtro
    .limit(limite)
    .skip(desde)
    .exec((err,usuario)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        Usuario.count({},(err,conteo)=>{ //en los parentesis se peude mandar parametros{}
            res.json({
                ok:true,
                cuantos:conteo,
                usuario
                
    
        });
    });
    
    });

});
// esta ruta con metodo Post especifico que en obtengo los datos y los guardo en la BDD
app.post('/usuario',function(req,res){

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
        role:body.role,
        img:body.img
    });
    usuario.save((err,usuarioDB)=>{
        if(err){
            return res.status(400).json({
                ok :false,
                err
            });
        }
        res.json({
            ok: true,
            usuario:usuarioDB

        });
    });
    
});

app.put('/usuario/:id',function(req,res){ //dentro de la url voy a recibir un parametro
    let id= req.params.id
    let body = _.pick(req.body,['nombre','email','img','role','estado']); //hace una copia del reuqest

    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDB)=>{//encontrar un objeto por el id que mando
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
               
        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });
});

//// esta ruta con metodo delete donde voy a eleminir dependiendo el id del usuario
app.delete('/usuario/:id',function(req,res){
    let id = req.params.id;

    Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(usuarioBorrado===null){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'usuario no encontrado'
                }

            });
        }
        res.json({
            ok:true,
            usuario:usuarioBorrado
        });


    });

});

module.exports= app;