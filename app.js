import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import connection from './connectionDB';


const app = express();
//Conexión Base de datos

// Middleware
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//INCLUSIÓN DE APIS
app.use("/api", require("./API/EjemploApi")); //Agregar en esta sección todos los archivos de APi con los que se vaya a trabajar



// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), () => {
  console.log('Example app listening on port '+ app.get('puerto'));
});