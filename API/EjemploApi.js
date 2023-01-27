/* 
Para personalizar cambiar en todo el documento:

EjemploModel por el nombre del modelo que se va a tratar en el CRUD

Recordar que se puede personalizar de forma más clara las rutas de cada una de las operaciones CRUD

*/

import express from 'express';
import connection from '../connectionDB';
const router = express.Router();



// CREATE
router.post('/create', (req, res) => {
  const query="INSERT INTO usuarios SET ?";
  const create={
    nombre:req.body.nombre,
    apellido:req.body.apellido
  }

      connection.query(query,create,(error,result)=>{
        if(error){
          res.status(400).json({
            mensaje: "Ocurrió un error",
            error
          })
        }else{
          res.status(200).json(result)
        }
      })
     
    
    });

//READ con parámetros
router.get('/read/:id', (req, res) => {
const _id = req.params.id;
const query=`SELECT * FROM usuarios where usuarios.id=${_id}`
  connection.query(query,(error,result)=>{
    if(error){
      res.status(400).json({
        mensaje: "Ocurrió un error",
        error
      })
    }else{
      res.status(200).json(result)
    }
  })
 

});
  // READ todos los documentos
  router.get('/read', (req, res) => {

      const query="SELECT * FROM usuarios"
      connection.query(query,(error,result)=>{
        if(error){
          res.status(400).json({
            mensaje: "Ocurrió un error",
            error
          })
        }else{
          res.status(200).json(result)

        }
      })
     
   
  });

  // UPDATE (No olvidar poner entre '' los parámetros que se van a modificar en la query!)
router.put('/update/:id', (req, res) => {
    const _id = req.params.id;
    const {nombre,apellido}=req.body;
    const query=`UPDATE usuarios SET nombre = '${nombre}', apellido = '${apellido}' WHERE id = ${_id}`
    connection.query(query,(error,result)=>{
      if(error){
        res.status(400).json({
          mensaje: "Ocurrió un error",
          error
        })
      }else{
        res.status(200).json(result)
      }
    })
   
  
  });

  // DELETE
router.delete('/delete/:id', async(req, res) => {
    const _id = req.params.id;
    const query=`DELETE FROM usuarios where usuarios.id=${_id}`
    connection.query(query,(error,result)=>{
      if(error){
        res.status(400).json({
          mensaje: "Ocurrió un error",
          error
        })
      }else{
        res.status(200).json(result)
      }
    })
   
  
  });
// Exportamos la configuración de express app
module.exports = router;
