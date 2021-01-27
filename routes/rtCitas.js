const express = require("express")
const rtCitas = express.Router()
const daoCitas = require('../dao/daoCitas')
const Cita = require('../models/Cita')

rtCitas.post('/guardar', (req, res) => {
    let nuevaCita = new Cita(req.body)
    let errores = nuevaCita.validacion()
    if (errores.length == 0) {
        daoCitas.guardar(nuevaCita)
            .then(cita => {
                if (cita == null)
                    res.render('error')
                else
                    res.render("respuesta", { newCita: cita })
            })
    } else {
        res.render("nueva", { errores: errores })
    }
})

//Nueva
rtCitas.get('/nueva', (req, res) => {
    res.render('nueva')
})

//Recordar cita
rtCitas.get('/buscarcita', (req, res) => {
    res.render('recordarcita')
})
rtCitas.post('/buscarcita', (req, res) => {
    let email = req.body.email
    daoCitas.getCitasByEmail(email)
        .then(encontradas => res.render('recordarcita', { citasencontradas: encontradas }))
})

//Cancelar cita
rtCitas.get('/cancelarcita', (req, res) => {
    res.render('cancelarcita')

})
rtCitas.get('/delete/:uuid', (req, res) => {
    let uuid = req.params.uuid
    daoCitas.deleteCita(uuid)
        .then((mensaje) => {
            res.render('cancelarcita', { 'mensaje': mensaje })
        })

})
rtCitas.post('/cancelarcita', (req, res) => {
    let email = req.body.email
    daoCitas.cancelarCita(email)
        .then(miscitas => res.render('cancelarcita', { citas: miscitas }))
})

//Modificar las citas
rtCitas.get('/modificarcita', (req, res) => {
    res.render('modificarcita')
})
rtCitas.post('/modificarcita', (req, res) => {
    let uuid = req.body.uuid
    let fecha = req.body.fecha
    let hora = req.body.hora
    daoCitas.modificarCita(uuid, fecha, hora)
        .then(citas => res.render('modificarcita', { citas }))
})


module.exports = rtCitas