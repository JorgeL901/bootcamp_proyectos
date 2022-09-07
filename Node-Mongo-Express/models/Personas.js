var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Persona=new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    adulto:{
        type: Boolean,
        default: true,
    }

});
//exportando el modulo que acabamos de crear
module.exports = mongoose.model("Personas",Persona)