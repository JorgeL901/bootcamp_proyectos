var express = require("express");
var app = express();
const port = 3000;
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");

const { ServerDescription } = require("mongodb");
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs'); //Configurar el motor de plantillas ejs
var Cit=require("./models/Citas");
mongoose.connect("mongodb+srv://jorge901:Naruto901@cluster0.cs7i4cn.mongodb.net/BD_Citas?retryWrites=true&w=majority")
.then(function(bd){
        console.log("Se conecto a la base de datos");
    }
        //que sucede si todo solo sale bien es decir se conecta la base de datos
    )
    .catch(function(err){
        //que sucede si no se conecta
        console.log(err);
    });
    app.get("/",function(req,res){
        res.sendFile(__dirname+"/index.html")
    })
    app.post("/ingresar",async function(req,res){
        var datos_form=req.body;
        
        c = new Cit(datos_form);
        await c.save();
        res.send(datos_form); 
    });




    app.listen(port,function(){
        console.log("Corriendo en el puerto "+ port)
    })