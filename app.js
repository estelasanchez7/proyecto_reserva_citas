const express = require('express')
const app = express()
const rtMain = require('./routes/rtMain')
const rtCitas = require('./routes/rtCitas')
var exphbs = require ('express-handlebars')
const fs = require('fs')


//Configuracion del motor de plantillas handlebars
app.engine('.hbs',exphbs({
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

//Middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true})) // lee las post y put.

//Enrutador principal
app.use('/',rtMain)
app.use('/citas',rtCitas)

//Servidor
app.listen(3000,(err)=>{
    console.log('Server run on port 3000')
})

