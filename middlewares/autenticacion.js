/*Para usar esta autenticación en otras apis, en las que necesitemos verificar al usuario logueados, proceder de la siguiente forma:

1) importar este archivo:   
      import { verificarAuth, verificarAdministador } from '../middlewares/autenticacion'; //importamos el middleware para verificar

2) se debe agregar el middleware en la línea de router.verboUsado así:

      router.put('/update-user/:id', verificarAdministador],async(req, res) => {        ---en caso de 1 solo método

      router.put('/update-user/:id', [verificarAuth,verificarAdministador],async(req, res) => {         ---en caso de más de uno


3)  Por temas de trazabilidad sería bueno que cuando el usuario use algún método POST de alguna api (PAra crear un registro), éste registro tenga un campo 
llamado userId, en el cual podamos incluir el id del usuario que realizó dicha creación. para hacer esto se debe agregar al BODY  del req recibido , 
los datos del id del usr de esta forma:

            const body= req.body;
            body.usuarioId= req.usuario.id;

    De este modo llevamos trazabilidad de operaciones en la misma base de datos

4) Finalmente Podemos usar ese ID en los métodos Get, para que al usar el find({usuarioId}), nos retorne solo los datos de esta persona. 

*/

const jwt = require('jsonwebtoken'); //Lo impotamos para verificar los tokens y verificar posteriormente las peticiones

const verificarAuth=(req,res,next)=>{
    const token=req.get("token"); //solicitamos el header de la petición donde inclimos el JWT
    jwt.verify(token,"constraseñaUltrasecreta",(error,decoded)=>{
        if (error) {
          return  res.status(400).json({
                mensaje: 'Usuario no válido',
                error
              });
            
        }

        //Obtenemos información del usuario para poder filtrar por roles en la función verificar administrador
        req.usuario=decoded.data;
        

        next();

    });
};

const verificarAdministador=(req, res, next)=>{
  const role=req.usuario.role;

  if (role==="ADMIN") {
    next();
  }else{
    return res.status(401).json({
      message:"Usuario no Administrador"
    })

  }
}

module.exports = {verificarAuth, verificarAdministador};