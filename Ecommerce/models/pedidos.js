var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Pedido=new Schema({
    name: String,
    prize: Number,
    cantidad: Number
    })
//exportando el modulo que acabamos de crear
module.exports=mongoose.model("Pedidos",Pedido)