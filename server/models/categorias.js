const mongoose = require('mongoose');


let Schema = mongoose.Schema; 

//este obejeto va ser en nuestra base de datos una tabla donde va a tener los campos que definamos
let categoriaSchema = new Schema({
    nombrecategoria:{
        type:String,
        required: [true , 'El nombre es requrido']
    },
    
});

module.exports= mongoose.model('Categoria',categoriaSchema);