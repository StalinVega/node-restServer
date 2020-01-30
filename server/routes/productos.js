const express = require('express');
const app = express();
const Producto = require('../models/productos');

app.post('/productos',function(req,res){

    let body = req.body
    let productos = new Producto({
        nombreP: body.nombreP,
        precioU: body.precioU,
        disponible: body.disponible
    });
    productos.save((err,productoDB)=>{
        if(err){
            return res.status(400).json({
                ok :false,
                err
            });
        }
        res.json({
            ok: true,
            productos:productoDB

        });
    });
    
});

module.exports= app;