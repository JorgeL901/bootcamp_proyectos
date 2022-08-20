var express = require("express");
var app = express();
var bodyParser = require ("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
//rutas
app.get('/inicio',function(req,res){
    res.sendFile(__dirname + "/index.html")
});

app.post('/usuario',function(req,res){
    var datos_ajax = req.body;
    res.send({"fecha":datos_ajax.fecha,"concepto":datos_ajax.concepto,"monto":datos_ajax.monto,"tipo":datos_ajax.tipo});
});


app.listen(3000,function(){
    console.log("Servidor Inicidado en el puerto 3000")
})