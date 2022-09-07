var express =require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");

mongoose.connect("mongodb+srv://jorge901:Naruto901@cluster0.cs7i4cn.mongodb.net/BD_personas?retryWrites=true&w=majority")
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
var Pers=require("./models/Personas")


//rutas
//Leer
app.get("/listado", async function(req,res){
    var documentos= await Pers.find();
    console.log(documentos);
    //res.send("Hola Mundo")
    res.sendFile(__dirname+"/index.html");
});

//Insertar
app.post("/persona", async function (req, res) {
    var datos_form = req.body;

    var p = new Pers(datos_form);
    await p.save(); //Inserta en la base de datos
    res.send("Datos insertados correctamente");
  });

//Update - Actualizar
app.put("/persona/:id",async function (req,res){
    var parametro = req.params.id;
    console.log("Modificando el documento con ID = "+parametro);

/*
    //Forma 1
    
    var p = await Pers.findById(parametro); //Busca un documento en Mongo con el ID
    p.nombre = req.body.nombre;
    p.apellido = req.body.apellido;
    p.edad = req.body.edad;
    await p.save();
    res.send("Modificando correctamente");
  */  
    //Forma 2
    var p=await Pers.updateOne({_id:parametro},req.body);
    res.send("Modificado correctamente");
})
app.delete('/persona/:dato', async function(req,res){
    var parametro = req.params.dato;
    console.log("Eliminando el documento con ID: "+ parametro);
  
    var p = await Pers.findById(parametro);
    await p.remove();

    res.send("La persona se eliminó correctamente")
})


//listen
app.listen(3000,function(){
console.log("Servidor Inicidado en el puerto 3000")
})