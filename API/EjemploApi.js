/* 
Para personalizar cambiar en todo el documento:

EjemploModel por el nombre del modelo que se va a tratar en el CRUD

Recordar que se puede personalizar de forma más clara las rutas de cada una de las operaciones CRUD

*/

import express from 'express';
import EjemploModel from '../models/EjemploModel'; //Verificar que la ruta del modelo personalizado sea la correcta.
const router = express.Router();


// CREATE
router.post('/create', async(req, res) => {
  const body = req.body;  
  try {
    const create = await EjemploModel.create(body);
    res.status(200).json(create); 
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

//READ con parámetros
router.get('/read/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const read = await EjemploModel.findOne({_id});
      res.json(read);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  
  // READ todos los documentos
  router.get('/read', async(req, res) => {
    try {
      const read = await EjemploModel.find();
      res.json(read);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // UPDATE
router.put('/update/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const update = await EjemploModel.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(update);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

  // DELETE
router.delete('/delete/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const destroy = await EjemploModel.findByIdAndDelete({_id});
      if(!destroy){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(destroy);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Exportamos la configuración de express app
module.exports = router;
