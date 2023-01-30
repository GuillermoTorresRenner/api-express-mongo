/*Para personalizar cambiar en todo el documento:

ejemploSchema por el nombre apropiado 

UserModel por el nombre apropiado, el cual debe coincidir con el nombre de éste archivo

*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');//inclusion del plugin de validación unico 
const roles = {
    values:["USER", "ADMIN"],
    message: "{VALUE} rol no valido"
    }

const userSchema = new Schema({
  nombre: {type: String, required: [true, 'nombre obligatorio']},
  email: {type: String, required:[ true,"email obligatorio"], unique:true},
  password: {type: String, required:[ true,"password obligatorio"]},
  date:{type: Date, default: Date.now},
  role:{type: String, default: "USER", enum: roles},
  activo: {type: Boolean, default: true}
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator, { message: 'Error, Elcorreo {PATH} ya se encuentra registrado.' });


//Ocultación de pass para no retornarlo a la vista
userSchema.methods.toJSON=function(){
    var obj=this.toObject();
    delete obj.password;
    return obj
}


// Convertir a modelo
const UserModel = mongoose.model('usuarios', userSchema); //El nombre que figura como String en el parámetro es el nombre que tendrá la colección en la DB

export default UserModel;