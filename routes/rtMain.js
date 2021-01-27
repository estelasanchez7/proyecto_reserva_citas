const express = require('express')
const rtMain = express.Router()

rtMain.get('/', (req, res) => {
    res.render('home')
})

module.exports = rtMain