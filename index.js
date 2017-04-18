'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


const app = express();
const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.get('/api/product', (res, req) => {

})

app.get('/api/product/:productId', (res, req) => {

})

app.post('/api/product', (res, req) => {

})

app.put('/api/product', (res, req) => {

})


mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
  if (err) {
    return console.log(`Error al conectarse a la DB`)
  }
  console.log('Conexion a la DB...')

  app.listen(port, () => {
    console.log(`API rest corriendo en localhost   :${port}`)
  })
})
