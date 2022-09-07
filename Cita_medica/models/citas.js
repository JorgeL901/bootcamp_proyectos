var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Cita=new Schema({
    especialidad: String,
    hora: String,
    jornada: String,
    fecha: Date,
    
    })
//exportando el modulo que acabamos de crear
module.exports=mongoose.model("Citas",Cita)