import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({

  nombre: {type: String, required: [true, 'Nombre obligatorio']},
  descripcion: String,
  usuarioId: String,
  date:{type: Date, default: Date.now},
  activo: {type: Boolean, default: true}

});

// Convertir a un modelo 
const Api = mongoose.model('EjemploApiDB', schema);

export default Api;