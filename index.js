const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

// Crear el servidor
const app = express();

// Habilitamos body parser: esto nos permite leer datos HTTP POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Rutas de la aplicación
app.use('/', routes());

app.listen(5000, () => {
    console.log('Server run in port 5000')
})