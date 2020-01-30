const express = require('express');
const app = express();
const Categoria = require('../models/categorias');

// esta ruta con metodo Post donde hago un pedido al servidor
app.post('/categorias',function(req,res){

    let body = req.body
    let categorias = new Categoria({
        nombrecategoria: body.nombre
    });
    categorias.save((err,categoriaDB)=>{
        if(err){
            return res.status(400).json({
                ok :false,
                err
            });
        }
        res.json({
            ok: true,
            categorias:categoriaDB

        });
    });
    
});

module.exports= app;