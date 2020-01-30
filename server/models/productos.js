const mongoose = require('mongoose');

//es un objeto Schema
//este obejeto va ser en nuestra base de datos una tabla donde va a tener los campos que definamos
let Schema = mongoose.Schema; 

let productosSchema = new Schema({
    nombreP:{
        type:String,
        required: [true , 'El nombre es requrido']
    },
    precioU:{
        type:String,
        required:[true,'el precio es requerido']
    },
    
    disponible:{
        type:Boolean,
        default:true
    },
    
});

module.exports= mongoose.model('Prodcutos',productosSchema);