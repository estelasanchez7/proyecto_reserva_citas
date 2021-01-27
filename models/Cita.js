const { v4: uuidv4 } = require('uuid')
const validator = require("email-validator")

module.exports = class Cita {

    //constructor    
    constructor(newCita) {
            this.nombre = newCita.nombre,
            this.email = newCita.email,
            this.telefono = newCita.telefono,
            this.fecha = newCita.fecha,
            this.hora = newCita.hora,
            this.uuid = uuidv4()
    }

    //getter y setter


    //metodos privados
 

    //Validaciones
    validacion() {
        let message=[]
        if (this.nombre == "") {
            message.push({error:'Lo sentimos, el formato del nombre indicado no es correcto. Vuelva a indicarlo de nuevo.'})
        }
        if (this.email == "") {
            message.push({error:'Lo sentimos, el formato del email indicado no es correcto. Vuelva a indicarlo de nuevo.'})
        }
        if (this.telefono == "" || this.telefono.length < 9 || this.telefono == isNaN) { //PREGUNTAR
            message.push({error:'Lo sentimos, el formato del teléfono indicado no es correcto. Vuelva a indicarlo de nuevo.'})
            
        }
        if (this.fecha == "") {
            message.push({error:'Por favor, indique una fecha para realizar la reserva de su cita.'})
        }
        if (this.hora == "") {
            message.push({error:'Por favor, indique una hora para realizar la reserva de su cita.'})
        }

        return message
    }

}

