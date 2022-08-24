var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Movimiento=new Schema({
    fecha: Date,
    concepto: String,
    monto: Number,
    tipo:{
        type: Boolean,
        default: true,
    }

})
//exportando el modulo que acabamos de crear
module.exports=mongoose.model("Movimiento",Movimiento)