const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path')
// Cors: permite que un cliente se conecte a otro servidor

// Conectar Mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

// Crear el servidor
const app = express();

// Habilitamos body parser: esto nos permite leer datos HTTP POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// Habilitar cors
app.use(cors());

// Rutas de la aplicación
app.use('/', routes());

// Carpeta pública para mostrar imágenes en el front
app.use(express.static("uploads"))

app.listen(5000, () => {
    console.log('Server run in port 5000')
})