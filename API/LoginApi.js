import express from "express";
import UserModel from "../models/UserModel";
const router=express.Router();
//Importaciones de bcrypt para poder comprar contraseña cifrada 
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Importación de JWT
const jwt = require('jsonwebtoken');


//usuarioDB
router.post("/",async (req,res)=>{
    const body=req.body;

   try {
    //Buscamos al usr por email
    const usuarioDB= await UserModel.findOne({email:body.email})
    //Coprobamos que el usuario exista, o mandaos un error.
    if (!usuarioDB) {
        return res.status(404).json({mensaje: "Email o Password incorrectos"})
        
    }
    //Si el usuario existe comparamos el pass usando bcrypt para desencriptar.
   if ( !bcrypt.compareSync(body.password,usuarioDB.password)) {
        res.status(404).json({mensaje:"Email o Password incorrectos"})
   }


   
   //Si se pasaron las dos verificaciones anteriores, el usuario se ha logueado correctamente y respondemos con el objeto usr y un JWT
   const token =jwt.sign({
    data: usuarioDB},
     'constraseñaUltrasecreta', 
     { expiresIn: 60*60*24*30 }); //Expiración del token
  
   
   res.json({
    usuarioDB,
    token
   })

   } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
   }
})

module.exports=router;