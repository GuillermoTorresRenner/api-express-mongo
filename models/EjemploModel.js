/*Para personalizar cambiar en todo el documento:

ejemploSchema por el nombre apropiado 

EjemploModel por el nombre apropiado, el cual debe coincidir con el nombre de éste archivo

*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ejemploSchema = new Schema({
  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}
});

// Convertir a modelo
const EjemploModel = mongoose.model('EjemploModel', ejemploSchema);

export default EjemploModel;