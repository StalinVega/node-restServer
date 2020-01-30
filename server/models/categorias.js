const mongoose = require('mongoose');


let Schema = mongoose.Schema; 

let categoriaSchema = new Schema({
    nombrecategoria:{
        type:String,
        required: [true , 'El nombre es requrido']
    },
    
});

module.exports= mongoose.model('Categoria',categoriaSchema);