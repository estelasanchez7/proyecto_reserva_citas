const Cita = require('../models/Cita')
const fs = require('fs')
const { resolve } = require('path')
//const { stringify } = require('querystring')

//Objeto daoCitas
const daoCitas = {}

//Recordar cita
daoCitas.getCitasByEmail = function (email) {
    return new Promise((resolve, reject) => {
        fs.readFile('./cita.json', 'utf-8', (err, data) => {
            if (err) reject(err)
            let citas = JSON.parse(data)
            resolve(citas.filter(c => {
                return c.email == email
            }))
        })
    })
}

//Cancelar cita
daoCitas.deleteCita = function (uuid) {
    return new Promise((resolve, reject) => {
        citas = JSON.parse(fs.readFileSync('./cita.json', 'utf-8'))
        citas = citas.filter(c => { return c.uuid != uuid })  // devuelve solo los objectos donde el id no es lo que necesitamos borrar
        fs.writeFileSync('./cita.json', JSON.stringify(citas), 'utf-8')
        resolve('La cita ha sido cancelada con éxito')
    })
}

daoCitas.cancelarCita = function (email) {
    return new Promise((resolve, reject) => {
        fs.readFile('./cita.json', 'utf-8', (err, data) => {
            if (err) reject(err)
            let citas = JSON.parse(data)
            resolve(citas.filter(c => {
                return c.email == email
            }))
        })
    })
}

//Guardar cita
daoCitas.guardar = function guardar(cita) {
    return new Promise((resolved, reject) => {
        let citas = [] //Esto es nuestra supuesta base de datos
        fs.readFile('./cita.json', 'utf-8', (err, data) => {
            if (err) reject(err)
            if (data != "") citas = JSON.parse(data)
            //primero comprobamos que la cita exista
            if (citas.find(c => c.fecha == cita.fecha && c.hora == cita.hora))
                resolved(null)
            else {
                //la cita está libre
                //guardar la cita
                citas.push(cita)
                fs.writeFile('./cita.json', JSON.stringify(citas), (err) => {
                    if (err) reject(err)
                    resolved(cita)

                })
            }
        })
    })
}

//Modificar cita

/*daoCitas.modificarCita = function(modificar){
    return new Promise((resolve, reject) => {
        fs.readFile('./cita.json', 'utf-8', (err, data) => {
            if (err) reject (err)
            let citas = JSON.parse(data)
            resolve(citas.filter(c => {
                return c.uuid == modificar
            }))
        })
    })
}*/

daoCitas.modificarCita = function (uuid, fecha, hora) {
    return new Promise((resolve, reject) => {

        citas = JSON.parse(fs.readFile('./cita.json', 'utf-8'))
        i = citas.findIndex((obj => obj.uuid == uuid))
        console.log(i)
        console.log(uuid)

        citas[i].fecha = fecha
        citas[i].hora = hora
        fs.writeFile('./dato/cita.json', JSON.stringify(citas), 'utf-8')

        resolve(citas[i])
    })
}

module.exports = daoCitas