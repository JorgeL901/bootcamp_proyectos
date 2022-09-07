var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Tarea=new Schema({
    titulo: String,
    detalle: String,
    fecha: Date,
    finalizada: {
        type: Boolean,
        default: false
    }
    })
//exportando el modulo que acabamos de crear
module.exports=mongoose.model("Tareas",Tarea)