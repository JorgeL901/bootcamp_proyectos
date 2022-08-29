var express = require("express");
var app = express();
const port = 3000;
var bodyParser = require ("body-parser");
var mongoose = require ("mongoose");
const { ServerDescription } = require("mongodb");
app.use(bodyParser.urlencoded({extended:true}));//configura body parser
mongoose.connect("mongodb+srv://jorge901:Naruto901@cluster0.cs7i4cn.mongodb.net/BD_Ecommerce?retryWrites=true&w=majority")
    .then(function(bd){
        console.log("Se conecto a la base de datos");
    }
        //que sucede si todo solo sale bien es decir se conecta la base de datos
    )
    .catch(function(err){
        //que sucede si no se conecta
        console.log(err);
    });

//Rutas para llamar las URL de los HTML
app.get("/productos",function(req,res){
    res.sendFile(__dirname+"/productos.html")
})
app.get('/administrador',function(req,res){
    
    res.sendFile(__dirname+"/index.html")
})


//Importo Modelo de datos
var Prod=require("./models/Productos");

//Modulos /Administrador (CRUD)
//Recibir datos del formulario
        //Read-Obtener-Buscar
app.get("/administrador",async function(req,res){
    var documentos = await Prod.find();
    console.log(documentos);
    //res.send(documentos);
    res.sendFile(__dirname+"/index.html")
})
        //Create-Insertar
app.post("/administrador",async function(req,res){
    var datos_form = req.body;
    var p = new Prod(datos_form);
    await p.save();//Inserta en la base de datos lo tomado del formulario
    //res.send({"name": datos_form.name, "description": datos_form.description, "prize": datos_form.prize, "image": datos_form.image})  
    res.redirect("../administrador")

})
/*    //Imprime en el HTML /administrador, pero como coloque otro post a adminitrador funcion el de 
app.post('/administrador',function(req,res){
    var formProducto = req.body;
    console.table(formProducto);  
    res.send({"name": formProducto.name, "description": formProducto.description, "prize": formProducto.prize, "image": formProducto.image})  
})*/

        //Update - Modificar

app.put("/administrador/:id",async function(req,res){
    var parametro = req.params.id;
    console.log( "Modificando el ID: "+parametro);
    var p = await Prod.updateOne({_id: parametro}, req.body)
    res.send ("Modificado correctamente")
})

        //Delete - Eliminar
app.delete("/administrador/:id",async function(req,res){
    var eliminado = req.params.id;
    console.log("Eliminando el producto con Id: "+ eliminado);
    var p= await Prod.findById(eliminado); //encuentra el documento a eliminar
    await p.remove(); //remueve de  MongoDB

})

//obtener datos de Mongo

app.get("/prueba",async function(req,res){// Envio base de datos a tabla administrador
    var documentos = await Prod.find();
    var filas;

    for(var i=0 ; i<documentos.length; i++){
        filas = filas + '<tbody><tr>';
        filas = filas + '<td>'+documentos[i].name+'</td>';
        //filas = filas + '<td>'+documentos[i].description+'</td>';
        filas = filas + '<td>'+documentos[i].prize+'</td>';
        filas = filas + '<td><button class="eliminador" id="'+documentos[i]._id+'">Eliminar producto</button>   </td></tr></tbody>'
    }
    res.send(filas);
})
app.get("/pruebaProducto",async function(req,res){// Envio productos a pestaña productos
    var documentos = await Prod.find();
    var filas ="";

    for(var i=0 ; i<documentos.length; i++){
        filas = filas + '<div class="col-3 p-1">'
        filas = filas + '<div class="card" style="width: 180 px; height: 400 px;">'
        filas = filas + '<img src="'+documentos[i].image+'" class="card-img-top" alt="Imagen '+documentos[i].name+'" >'
        filas = filas + '<div class="card-body">'
        filas = filas + '<h5 class="card-title">'+documentos[i].name+'</h5>'
        filas = filas + '<p class="card-text">COP$'+documentos[i].prize+'</p>'
        filas = filas + '<a href="./item.html" class="btn btn-primary" id:"'+documentos[i]._id+'>Añadir</a>'
        filas = filas + '</div></div></div>'
        }
    res.send(filas);
})

//LISTENER
app.listen(port,function(){
    console.log("Corriendo en el puerto "+ port)
})