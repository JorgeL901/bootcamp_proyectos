var express = require("express");
var app = express();
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://jorge901:Naruto901@cluster0.cs7i4cn.mongodb.net/BD_control_gastos?retryWrites=true&w=majority")
    .then(function(bd){
        console.log("Se conecto a la base de datos");
    }
        //que sucede si todo solo sale bien es decir se conecta la base de datos
    )
    .catch(function(err){
        //que sucede si no se conecta
        console.log(err);
    });
//configuracion
app.use(bodyParser.urlencoded({extended:true}));

//importo el modelo de datos
var Mov=require("./models/Movimiento")

//rutas
//leer
app.get('/inicio',async function(req,res){
    var documentos= await Mov.find();
    //console.log(documentos)
    res.sendFile(__dirname + "/index.html")
});

//Insertar
app.post("/movimiento", async function (req, res) {
    var datos_form = req.body;
    var p = new Mov(datos_form);
    await p.save(); //Inserta en la base de datos
    res.send(datos_form);

  });

//Update - Actualizar
app.put("/movimiento/:id",async function (req,res){
    var parametro = req.params.id;
    console.log("Modificando el documento con ID = "+parametro);
    var p=await Mov.updateOne({_id:parametro},req.body);
    res.send("Modificado correctamente");
});




app.post('/usuario',function(req,res){
    var datos_ajax = req.body;
    res.send({"fecha":datos_ajax.fecha,"concepto":datos_ajax.concepto,"monto":datos_ajax.monto,"tipo":datos_ajax.tipo});
});


app.listen(3000,function(){
    console.log("Servidor Inicidado en el puerto 3000")
})