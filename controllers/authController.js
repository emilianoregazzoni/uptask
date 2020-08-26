const passport = require('passport');
const Usuarios = require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto = require('crypto'); // token
const { sequelize } = require('../models/Usuarios');
const bcrypt = require('bcrypt-nodejs');
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion',
    failureFlash : true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// Funcion para revisar usuario logeado

exports.usuarioAutenticado = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/iniciar-sesion');
}

// Funcion cerrar sesion

exports.cerrarSesion =(req,res) =>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion'); 
    })
}

// genera un token si el usuario es valido

exports.enviarToken = async (req,res) => {
    // chequear usuario
    const email = req.body; 
    const usuario = await Usuarios.findOne({where: email}); 

    if(!usuario){
        req.flash('error','no existe esa cuenta');
        res.redirect('/reestablecer');
    }
    // usuario existe y expiracion
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expiracion = Date.now() + 360000;

    await usuario.save();

    const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;
    //console.log(resetUrl);
    // Envia correo con token

    await enviarEmail.enviar({
        usuario,
        subject: 'Reset password',
        resetUrl,
        archivo: 'reestablecer-password'
    })

    // Finalizar accion
    req.flash('correcto', 'Se envió un mensaje a tu email');
    res.redirect('/iniciar-sesion');
}

exports.validarToken = async(req,res) => {

//res.json(req.params.token);

   const usuario = await Usuarios.findOne({
       where: {
           token: req.params.token
       }
   })

   if(!usuario){
       req.flash('error','No valido');
       res.redirect('/reestablecer');
   }

   //console.log(usuario);

   res.render('resetPassword',{
       nombrePagina: 'Restablecer password'
   })
}

exports.actualizarPassword = async(req,res) =>{
  const usuario = await Usuarios.findOne({
      where:{
          token: req.params.token,
          expiracion:{
                [Op.gte] : Date.now()
          }
      }
  });

  if(!usuario){
      req.flash('error', 'No válido');
      res.redirect('/reestablecer');
  }

  // hashear nuevo pass
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiracion = null;

  await usuario.save();

  req.flash('correcto','Tu password se ha modificado correctamente')

  res.redirect('/iniciar-sesion');


}