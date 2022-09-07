var express = require("express");
var app = express();
const port = 3000;
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");

mongoose.connect("mongodb+srv://jorge901:Naruto901@cluster0.cs7i4cn.mongodb.net/BD_Tareas?retryWrites=true&w=majority")
.then(function(bd){
        console.log("Se conecto a la base de datos "+ bd );
    }
        //que sucede si todo solo sale bien es decir se conecta la base de datos
    )
    .catch(function(err){
        //que sucede si no se conecta
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended:true}));

var path = __dirname +"/views";
app.set("views",path); //Configuramos la carpeta donde se encuentran nuestras vistas
app.set("view engine","ejs"); //Configuramos el motor de plantilla

var Tarea = require("./models/tareas");

//RUTAS
app.get("/inicio",function(req,res){
    var titulo_pagina = "Nueva Tarea"
    res.render("index", {tit : titulo_pagina});
});

app.get("/listado", async function (req,res){
    var titulo_pagina = "Listado Tareas"
    var tareas = await Tarea.find();
    res.render("listado",{docs : tareas, tit:titulo_pagina});
});

app.post("/nuevaTarea", async function(req,res){
    var datos = req.body;
    console.log(datos);
    var t = new Tarea(datos);
    await t.save();
    console.log(t)
    res.redirect("/listado"); //redirecciona a listado<
})

app.listen(port,function(){
    console.log("Corriendo en el puerto "+ port)
})