var mongoose =require("mongoose");
var Schema = mongoose.Schema;

//crea un esquema con la estructura de datos que tendran los documentos de esta coleccion
var Producto=new Schema({
    name: String,
    description: String,
    prize: Number,
    image: String
    })
//exportando el modulo que acabamos de crear
module.exports=mongoose.model("Productos",Producto)

