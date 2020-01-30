const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

//es un objeto Schema
let Schema = mongoose.Schema; 

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: [true , 'El nombre es requrido']
    },
    email:{
        type:String,
        required:[true,'el email es requerido'],
        unique: true
    },
    password:{
        type:String,
        required:[true,'el password es requerido']
    },
    img:{
        type: String,
        required:false
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum: rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

});

usuarioSchema.methods.toJSON =function(){

    let user=this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}
usuarioSchema.plugin(beautifyUnique);
module.exports= mongoose.model('Usuario',usuarioSchema);